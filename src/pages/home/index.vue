<template>
  <div class="page-home">
    <Card class="page-home-header-card" :bordered="false" dis-hover>
      <p class="page-home-header-card-desc">
        {{ info.name }}，您好 !
      </p>
      <p class="page-home-header-card-title">
        歡迎使用
        <span>一路發報關系統</span>
      </p>

      <div class="page-home-header-card-tags">
        <Tag class="ivu-mr" size="large">
          <Icon custom="fas fa-clock fa-fw" size="15"/>
          登入時間: {{ loginDate }}
        </Tag>
      </div>
    </Card>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'home',
    computed: {
      ...mapState('admin/user', [
        'info'
      ]),
      ...mapGetters('admin/user', [
        'loginDate'
      ])
    },
    methods: {
      toUserSetup () {
        this.$router.push('/user_setup')
      }
    }
  }
</script>
