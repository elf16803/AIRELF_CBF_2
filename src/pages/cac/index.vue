<template>
  <div class="page-cac">
    <custom-card v-show="!loading" title="清關費">
      <div class="page-cac-header-tool">
        <div class="page-cac-actions-wrap">
          <Select class="i-date-select-width" v-model="searchDate" @on-change="onDateSelect" >
            <Option
              v-for="item in dateList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
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

        <Tag class="i-tag" size="large" color="red">清關費 總計：
          <span v-color="'blue'"> {{total}} </span>
          <span v-color="'green'"> + {{Math.round(total*0.05)}}(5%) =  </span>
          <span v-color="'blue'"> {{Math.round(total *1.05,0)}} </span>
        </Tag>
      </div>

      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="cacList"
        hasPage
      ></component>
    </custom-card>

    <Spin class="i-spin-full" v-show="loading" size="large" fix></Spin>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'cac',
    data () {
      return {
        columns: [
          {
            title: '船班日期',
            key: '實際航班日期',
            sortable: 'custom',
            minWidth: 110,
            align: 'center',
            render: (h, { row }) => {
              const content = this.$Date(row['實際航班日期']).format('YY/MM/DD')
              return h('div', content)
            }
          },
          {
            title: '船班號',
            key: '航班號碼',
            minWidth: 140,
            sortable: 'custom',
            align: 'center'
          },
          {
            title: '主單號',
            key: '主單號',
            sortable: 'custom',
            minWidth: 160,
            align: 'center'
          },
          {
            title: '立方數',
            key: '立方數',
            minWidth: 80,
            align: 'center',
            render: (h, { row }) => {
              const content = row['立方數'].toFixed(2)
              return h('div', content)
            }
          },
          {
            title: '重量',
            key: '空運毛重',
            minWidth: 90,
            align: 'center'
          },
          {
            title: '未清重量',
            key: '未清重量',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '已清重量',
            key: '已清重量',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '單價',
            key: '清關費單價',
            minWidth: 80,
            align: 'center'
          },
          {
            title: '清關費',
            key: '清關費',
            minWidth: 100,
            align: 'center',
            render: (h, { row }) => {
              const content = ((row['已清重量']+row['未清重量']) * row['清關費單價']).toFixed(0)
              return h('div', content)
            }
          },
          {
            title: '貨櫃類型',
            key: '貨櫃類型',
            minWidth: 75,
            align: 'center'
          },
          {
            title: '拖車費',
            key: '貨櫃拖車費',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '小計',
            key: '小計',
            minWidth: 120,
            align: 'center',
            render: (h, { row }) => {
              const content = ((row['已清重量']+row['未清重量']) * row['清關費單價'] + row['貨櫃拖車費']).toFixed(0)
              return h('div', content)
            }
          }
        ],

        searchDate: '',
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
        'cacList'
      ]),
      total () {
        let total = 0
        this.cacList.forEach((item) => {
          total += parseInt(((item['已清重量']+item['未清重量']) * item['清關費單價'] + item['貨櫃拖車費']).toFixed(0))
        })

        return total
      }
    },
    methods: {
      ...mapActions('data/system', [
        'getSystemDate'
      ]),
      ...mapActions('data/tariff-data', [
        'getCacList',
        'reportCkf'
      ]),
      onDateSelect (value) {
        this.loading = true

        this.getCacList({
          searchDate: value
        })
          .finally(() => {
            this.loading = false
          })
      },
      reportFile () {
        this.loadingReport = true

        this.reportCkf({
          searchDate: this.searchDate,
          category: 1,
          vm: this
        })
          .finally(() => {
            this.loadingReport = false
          })
      }
    },
    created () {
      this.loading = true

      this.getSystemDate()
        .then(({ defaultSearchDate }) => {
          this.searchDate = defaultSearchDate

          return this.getCacList({
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
