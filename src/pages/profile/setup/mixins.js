import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('admin/layout', [
      'isMobile',
      'isDesktop'
    ]),
    labelWidth () {
      return this.isMobile ? undefined : 90
    },
    labelPosition () {
      return this.isMobile ? 'top' : 'left'
    }
  }
}
