<template>
  <div class="page-x2c-imprt'">
    <custom-card v-show="!loading" title="X2 關稅匯入失敗明細">
      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="x2cImprtList"
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
    name: 'x2c-imprt',
    data () {
      return {
        columns: [
          {
            title: '船班日期',
            key: 'n船班日期',
            sortable: 'custom',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '主單號',
            key: 'n主單號',
            sortable: 'custom',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '清關條碼',
            key: '清關條碼',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '查件貨號',
            key: 'n查件貨號',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'n姓名',
            sortable: 'custom',
            minWidth: 90,
            align: 'center'
          },
          {
            title: '重量',
            key: 'n重量',
            sortable: 'custom',
            minWidth: 90,
            align: 'center'
          },
          {
            title: '稅單編號',
            key: '稅單編號',
            sortable: 'custom',
            minWidth: 110,
            align: 'center'
          },
          {
            title: '稅金',
            key: '稅金',
            sortable: 'custom',
            minWidth: 90,
            align: 'center'
          },
          {
            title: '原因',
            key: '匯入狀態',
            sortable: 'custom',
            minWidth: 120,
            align: 'center'
          }
        ],
        x2cImprtList: [],
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
        'getImprtList'
      ])
    },
    created () {
      this.loading = true

      this.getImprtList()
        .then(response => {
          this.x2cImprtList = response
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
