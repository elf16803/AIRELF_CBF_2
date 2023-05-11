<script>
  // 用來渲染 column 的 render
  export default {
    name: 'vnode',
    functional: true,
    props: {
      row: {
        type: Object
      },
      render: {
        type: Function
      },
      index: {
        type: Number
      },
      column: {
        type: Object,
        default: null
      }
    },
    render: (h, ctx) => {
      const params = {
        row: ctx.props.row,
        index: ctx.props.index
      }

      if (ctx.props.column) params.column = ctx.props.column
      return ctx.props.render(h, params)
    }
  }
</script>
