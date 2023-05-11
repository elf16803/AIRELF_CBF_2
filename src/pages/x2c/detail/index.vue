<template>
  <div class="page-x2c-detail">
    <custom-card v-show="!loading" :title="title">

      <component
        :is="isDesktop ? 'page-table' : 'infinite-list'"
        :columns="columns"
        :data="x2cDetailList"
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
    name: 'x2c-detail',
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
            title: '稅金',
            key: 'X2關稅',
            sortable: 'custom',
            minWidth: 80,
            align: 'center'
          },
          {
            title: '報單號碼',
            key: 'X2報單號碼',
            sortable: 'custom',
            minWidth: 80,
            align: 'center'
          },
          {
            title: '稅單編號',
            key: 'X2稅單號碼',
            sortable: 'custom',
            minWidth: 80,
            align: 'center'
          },
          {
            title: '列印時間',
            key: 'X2列印時間',
            sortable: 'custom',
            minWidth: 80,
            align: 'center',
            render: (h, { row }) => {
              const content = row['X2列印時間'] ? this.$Date(row['X2列印時間']).format('MM/DD') : ''
              return h('div', content)
            }
          }
        ],
        x2cDetailList: [],
        loading: false
      }
    },
    computed: {
      ...mapState('admin/layout', [
        'isDesktop'
      ]),
      title () {
        const id = this.$base64.decode(this.$route.query.q)
        return `${id} 關稅明細`
      }
    },
    methods: {
      ...mapActions('data/tariff-data', [
        'getX2cDetail'
      ])
    },
    created () {
      const id = this.$base64.decode(this.$route.query.q)

      this.loading = true

      this.getX2cDetail({
        mawb: id
      })
        .then(response => {
          this.x2cDetailList = response
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
