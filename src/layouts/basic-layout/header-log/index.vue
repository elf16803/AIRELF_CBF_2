<template>
    <Tooltip :content="tooltipContent" transfer>
        <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="handleOpenLog">
            <Badge :count="lengthError === 0 ? null : lengthError" :overflow-count="99" :dot="showDot" :offset="showDot ? [26, 2] : [20, 0]">
                <Icon custom="far fa-dot-circle" />
            </Badge>
        </span>
    </Tooltip>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'iHeaderLog',
    computed: {
      ...mapGetters('admin/log', [
        'length',
        'lengthError'
      ]),
      showDot () {
        return !!this.length && this.lengthError === 0
      },
      tooltipContent () {
        if (!this.length) {
          return '沒有日誌或異常'
        } else {
          let text = `${this.length} 條日誌`
          if (this.lengthError) text += ` | 包含 ${this.lengthError} 個異常`
          return text
        }
      }
    },
    methods: {
      handleOpenLog () {
        this.$router.push({
          name: 'log'
        }, () => {})
      }
    }
  }
</script>
