<template>
  <div class="page-xgc-detail">
    <custom-card v-show="!loading" title="X3G1 轉報關稅明細">

      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="xgcDetailList"
        :labelMinWidth="70"
        hasPage
      ></component>
    </custom-card>

    <Spin class="i-spin-full" v-show="loading" size="large" fix></Spin>
    <previous />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'xgc-detail',
    data () {
      return {
        columns: [
          {
            title: '清關條碼',
            key: '清關條碼',
            sortable: 'custom',
            minWidth: 90,
            align: 'center'
          },
          {
            title: '查件貨號',
            key: '查件貨號',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '姓名',
            key: '收件人',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '稅金',
            key: '關稅',
            sortable: 'custom',
            minWidth: 80,
            align: 'center'
          }
        ],
        xgcDetailList: [],
        loading: false
      }
    },
    computed: {
      ...mapState('admin/layout', [
        'isDesktop'
      ])
    },
    methods: {
      ...mapActions('data/tariff-data', [
        'getXgcDetail'
      ])
    },
    created () {
      const searchDate = this.$base64.decode(this.$route.query.q)

      this.loading = true

      this.getXgcDetail({
        searchDate
      })
        .then(response => {
          this.xgcDetailList = response
        })
        .catch(error => {
          this.$Modal.error({
            title: '錯誤訊息',
            content: error.message,
            onOk: () => {
              this.$router.go(-1)
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
</script>
