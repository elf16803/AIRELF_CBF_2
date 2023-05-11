<template>
  <div class="page-x2c">
    <custom-card v-show="!loading" title="X2 關稅">
      <div class="page-x2c-header-tool">
        <div class="page-x2c-actions-wrap">
          <Select class="i-date-select-width" v-model="searchDate" @on-change="onDateSelect" >
            <Option
              v-for="item in dateList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>

          <Upload
            class="ivu-mb-8 ivu-mr-8"
            action=""
            :before-upload="onUpload"
            :show-upload-list="false"
          >
            <Button type="success" custom-icon="fas fa-cloud-upload-alt">匯入關稅</Button>
          </Upload>

          <Button
            class="ivu-mb-8 ivu-mr-8"
            type="error"
            custom-icon="far fa-times-circle"
            to="/x2c/imprt"
          >
            匯入失敗明細
          </Button>

          <Button
            class="ivu-mb-8 ivu-mr-8"
            type="info"
            custom-icon="fas fa-file-export"
            :loading="loadingReport"
            @click="reportFile"
          >
            匯出對帳單
          </Button>
        </div>

        <div class="page-x2c-total-tags-wrap">
          <Tag class="i-tag" size="large" color="red">關稅 總計：
            <span v-color="'blue'"> {{ total['關稅'] }} </span>
            <span v-color="'green'" v-if="new Date(this.searchDate) < new Date('2022/05/01')"> + {{ Math.round( total['關稅'] * 0.05) }}(5%) =  </span>
            <span v-color="'blue'" v-if="new Date(this.searchDate) < new Date('2022/05/01')">{{ Math.round( total['關稅'] * 1.05,0) }} </span>
          </Tag>
          <Tag class="i-tag" size="large" color="red">總重稅平均 合計：
            <span v-color="'blue'">{{total['總稅重比'].toFixed(2)}}</span>
          </Tag>
          <Tag class="i-tag" size="large" color="red">X2稅平均 合計：
            <span v-color="'blue'">{{total['包稅重比'].toFixed(2)}}</span>
          </Tag>
        </div>
      </div>

      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="x2cList"
        :labelMinWidth="95"
        hasPage
      ></component>
    </custom-card>

    <Spin class="i-spin-full" v-show="loading" size="large" fix></Spin>

    <Modal v-model="modalLoading" width="360" footer-hide :closable="false" :mask-closable="false">
      <div style="padding:30px;">
        <Spin>
            <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
            <div>資料匯入中，請稍後．．．</div>
        </Spin>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'x2c',
    data () {
      return {
        columns: [
          {
            title: '船班日期',
            key: '實際航班日期',
            sortable: 'custom',
            minWidth: 120,
            align: 'center',
            render: (h, { row }) => {
              const content = this.$Date(row['實際航班日期']).format('YYYY/MM/DD')
              return h('div', content)
            }
          },
          {
            title: '主單號',
            key: '主單號',
            sortable: 'custom',
            minWidth: 160,
            align: 'center'
          },
          {
            title: '稅金',
            key: 'x2關稅',
            sortable: 'custom',
            minWidth: 85,
            align: 'center'
          },
          {
            title: '總重量',
            key: '總重量',
            sortable: 'custom',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '總重稅平均',
            key: '總稅重比',
            sortable: 'custom',
            minWidth: 130,
            align: 'center'
          },
          {
            title: 'X2稅重量',
            key: '包稅重量',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: 'X2稅平均',
            key: '包稅重比',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '操作',
            minWidth: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row)
                    }
                  }
                }, '明細')
              ])
            }
          }
        ],

        searchDate: '',
        modalLoading: false,
        loading: false,
        loadingReport: false
      }
    },
    computed: {
      ...mapState('admin/layout', [
        'isDesktop'
      ]),
      ...mapState('data/system', [
        'dateList'
      ]),
      ...mapState('data/tariff-data', [
        'x2cList'
      ]),
      total () {
        let sum關稅 = 0
        let sum總重量 = 0
        let sum包稅重量 = 0
        let sum總稅重比 = 0.0
        let sum包稅重比 = 0.0

        this.x2cList.forEach((item) => {
          sum關稅 += item['x2關稅']
          sum總重量 += item['總重量']
          sum包稅重量 += item['包稅重量']
        })

        if (this.x2cList.length > 0) {
          sum總稅重比 = sum關稅 / sum總重量
          sum包稅重比 = sum關稅 / sum包稅重量
        }

        return {
          '關稅': sum關稅,
          '總稅重比': sum總稅重比,
          '包稅重比': sum包稅重比
        }
      }
    },
    methods: {
      ...mapActions('data/system', [
        'getSystemDate'
      ]),
      ...mapActions('data/tariff-data', [
        'getX2cList',
        'imprtX2',
        'reportCkf'
      ]),
      reportFile () {
        this.loadingReport = true

        this.reportCkf({
          searchDate: this.searchDate,
          category: 2,
          vm: this
        })
          .finally(() => {
            this.loadingReport = false
          })
      },
      onUpload (file) {
        const names = file.name.split('.')
        const exName = names[names.length - 1]

        const reader = new FileReader()
        reader.readAsDataURL(file)

        this.modalLoading = true
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]

          this.imprtX2({
            file: base64,
            exName
          })
            .then(() => {
              this.$Modal.success({
                title: '提示訊息',
                content: '匯入完成'
              })
            })
            .catch(error => {
              this.$Modal.error({
                title: '錯誤訊息',
                content: error.message
              })
            })
            .finally(() => {
              this.modalLoading = false
            })
        }

        return false
      },
      onDateSelect (value) {
        this.loading = true

        this.getX2cList({
          searchDate: value
        })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message
            })
          })
          .finally(() => {
            this.loading = false
          })
      },
      toDetail (row) {
        const x2cId = this.$base64.encode(row['主單號'])

        this.$router.push({
          path: '/x2c/detail',
          query: {
            q: x2cId
          }
        })
      }
    },
    created () {
      this.loading = true

      this.getSystemDate()
        .then(({ defaultSearchDate }) => {
          this.searchDate = defaultSearchDate

          return this.getX2cList({
            searchDate: this.searchDate
          })
        })
        .catch(error => {
          this.$Modal.error({
            title: '錯誤訊息',
            content: error.message
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
</script>
