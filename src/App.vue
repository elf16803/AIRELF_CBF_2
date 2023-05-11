<template>
    <div id="app">
        <router-view />

        <BackTop :bottom="60" :right="5"></BackTop>
        <help-drawer />
    </div>
</template>
<script>
  import { on, off } from 'view-design/src/utils/dom'
  import { setMatchMedia } from 'view-design/src/utils/assist'

  import { mapMutations } from 'vuex'

  import helpDrawer from '@/components/help-drawer'

  setMatchMedia()

  export default {
    name: 'app',
    components: {
      'help-drawer': helpDrawer
    },
    methods: {
      ...mapMutations('admin/layout', [
        'setDevice'
      ]),
      handleWindowResize () {
        this.handleMatchMedia()
      },
      handleMatchMedia () {
        const matchMedia = window.matchMedia

        if (matchMedia('(max-width: 600px)').matches) {
          this.setDevice('Mobile')
        } else if (matchMedia('(max-width: 992px)').matches) {
          this.setDevice('Tablet')
        } else {
          this.setDevice('Desktop')
        }
      },
      hashchangeHandler () {
        /*
          修復 router.go(-1) 時, url 有改變, 但 view 沒變的 Bug,
          如果前往的路由與當前路由不同則執行 router.push
        */
        let toPath = window.location.hash.slice(1)
        if (this.$route.path !== toPath) {
          this.$router.push(toPath)
        }
      }
    },
    mounted () {
      on(window, 'resize', this.handleWindowResize)
      on(window, 'hashchange', this.hashchangeHandler, false)
      this.handleMatchMedia()
    },
    beforeDestroy () {
      off(window, 'resize', this.handleWindowResize)
    }
  }

  window.onload = function () {
    // ios 禁止縮放
    let lastTouchEnd = 0
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, { passive: false })
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  }
</script>
