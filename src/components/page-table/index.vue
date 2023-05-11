<template>
  <div>
    <Table
      ref="table"
      :columns="columns"
      :data="hasPage ? dataWithPage : dataWithFilter"
      @on-sort-change="tableSortChange"
      @on-filter-change="tableFilterChange"
    />

    <Page
      v-if="hasPage"
      class="ivu-text-center ivu-mt"
      :total="dataWithFilter.length"
      :current.sync="page.current"
      :page-size="page.size"
      show-sizer
      @on-page-size-change="pageChangeSize"
    />
  </div>
</template>

<script>
  export default {
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      hasPage: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        inputDataName: {
          data: 'data',
          withSort: '',
          withFilter: '',
          withPage: ''
        },
        sort: {
          column: '',
          type: ''
        },
        filter: {
          column: '',
          value: ''
        },
        page: {
          current: 1,
          size: 10
        }
      }
    },
    computed: {
      dataWithSort () {
        let data = [...this.data]
        const { column, type } = this.sort

        if (type === 'desc') {
          data = data.sort((a, b) => {
            if (typeof a[column] === 'number') {
              return a[column] - b[column]
            } else {
              return a[column] > b[column] ? -1 : 1
            }
          })
        }

        if (type === 'asc') {
          data = data.sort((a, b) => {
            if (typeof a[column] === 'number') {
              return b[column] - a[column]
            } else {
              return b[column] > a[column] ? -1 : 1
            }
          })
        }

        return data
      },
      dataWithFilter () {
        let data = [...this.dataWithSort]
        const { column, value } = this.filter

        if (value.length !== 0) data = data.filter(item => value.includes(item[column]))

        return data
      },
      dataWithPage () {
        let data = [...this.dataWithFilter]

        const { current, size } = this.page
        const start = current * size - size
        const end = start + size

        return [...data].slice(start, end)
      }
    },
    methods: {
      tableSortChange ({ column, key, order }) {
        if (order === 'normal') {
          // 如果排序類型: normal, 則尋找當前排序的 column 的 index 後, 使用 handleSort() 去阻止排序
          const currentColumnName = column.title
          const currentIndex = this.columns.findIndex(column => column.title === currentColumnName)

          this.$refs.table.handleSort(currentIndex, this.sort.type)
          return
        }

        this.sort.column = key
        this.sort.type = order
      },
      tableFilterChange (row) {
        this.filter.column = row.key
        this.filter.value = row._filterChecked

        // 篩選資料後, 將頁面回到第一頁
        if (this.hasPage) this.page.current = 1
      },
      pageChangeSize (size) {
        if (this.hasPage) this.page.size = size
      }
    }
  }
</script>
