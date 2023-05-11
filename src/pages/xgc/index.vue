<template>
  <div class="page-xgc">
    <custom-card v-show="!loading" title="X3G1 轉報關稅">
      <div class="page-xgc-header-tool">
        <Select class="i-date-select-width" v-model="searchDate" @on-change="onDateSelect" >
          <Option
            v-for="item in dateList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </div>

      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="xgcList"
        :labelMinWidth="85"
        hasPage
      ></component>
    </custom-card>

    <Spin class="i-spin-full" v-show="loading" size="large" fix></Spin>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'xgc',
    data () {
      return {
        columns: [
          {
            title: '日期',
            key: '日期',
            sortable: 'custom',
            minWidth: 90,
            align: 'center',
            render: (h, { row }) => {
              const content = this.$Date(row['日期']).format('YYYY/MM/DD')
              return h('div', content)
            }
          },
          {
            title: '數量',
            key: '筆數',
            sortable: 'custom',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '稅金',
            key: '關稅',
            sortable: 'custom',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '預計付款日',
            key: '預計付款日',
            sortable: 'custom',
            minWidth: 110,
            align: 'center',
            render: (h, { row }) => {
              const date = new Date(row['預計付款日'].split(' ')[0])
              const content = this.$Date(date).format('YYYY/MM/DD')

              return h('div', content)
            }
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
        loading: false
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
        'xgcList'
      ])
    },
    methods: {
      ...mapActions('data/system', [
        'getSystemDate'
      ]),
      ...mapActions('data/tariff-data', [
        'getXgcList'
      ]),
      onDateSelect (value) {
        this.loading = true

        this.getXgcList({
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
        const xgcDate = this.$base64.encode(row['日期'])

        this.$router.push({
          path: '/xgc/detail',
          query: {
            q: xgcDate
          }
        })
      }
    },
    created () {
      this.loading = true

      this.getSystemDate()
        .then(({ defaultSearchDate }) => {
          this.searchDate = defaultSearchDate

          return this.getXgcList({
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
