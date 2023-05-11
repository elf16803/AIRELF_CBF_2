<template>
  <div class="infinite-list">
    <div
      v-if="data.length === 0"
      class="ivu-text-center"
    > 暫無資料 </div>

    <Row
      class-name="infinite-list-row"
      :gutter="12"
      v-for="(row, index) in dataWithScroll"
      :key="row.index"
    >
      <Col
        class-name="infinite-list-col"
        v-for="column in columns"
        :key="column.key"
        v-bind="grid"
      >
        <vnode
          v-if="column.render && column.title === '操作'"
          :column="column"
          :row="row"
          :index="index"
          :render="column.render"
        />

        <template v-else>
          <div
            class="infinite-list-col-label"
            :style="{ minWidth: `${labelMinWidth}px` }"
          >{{ column.key }}:</div>

          <div v-if="column.render" class="infinite-list-col-content">
            <vnode
              :column="column"
              :row="row"
              :index="index"
              :render="column.render"
            />
          </div>

          <div v-else class="infinite-list-col-content">
              {{ row[column.key] }}
          </div>
        </template>
      </Col>
    </Row>

    <scroll-loader :loader-method="scrollLoaderHandler" :loader-disable="scrollLoader.disable">
      <Spin size="large" />
    </scroll-loader>
  </div>
</template>

<script>
  import vnode from './vnode.vue'

  export default {
    components: {
      vnode
    },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      labelMinWidth: {
        type: Number,
        default: 100
      }
    },
    data () {
      return {
        grid: {
          xxl: 8,
          xl: 8,
          lg: 8,
          md: 12,
          sm: 12,
          xs: 24
        },
        scrollLoader: {
          size: 10,
          disable: false
        }
      }
    },
    computed: {
      dataWithScroll () {
        const data = this.data

        const end = this.scrollLoader.size

        return [...data].slice(0, end)
      }
    },
    methods: {
      scrollLoaderHandler () {
        if (this.dataWithScroll.length === this.data.length || this.data.length === 0) {
          this.scrollLoader.disable = true
          return
        }

        if (this.scrollLoader.disable) this.scrollLoader.disable = false

        setTimeout(() => {
          this.scrollLoader.size += 10
        }, 600)
      }
    }
  }
</script>
