<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
      <Dropdown trigger="click" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
        <Avatar size="small">{{ info.name }}</Avatar>
        <!-- <span class="i-layout-header-user-name" v-if="!isMobile">{{ info.name }}</span> -->

        <DropdownMenu slot="list">
          <!-- <i-link to="/setup_profile">
            <DropdownItem>
              <Icon custom="fas fa-user-cog fa-fw" />
              <span>{{ $t('basicLayout.user.setting') }}</span>
            </DropdownItem>
          </i-link> -->

          <DropdownItem name="logout">
            <Icon custom="fas fa-power-off fa-fw" />
            <span>{{ $t('basicLayout.user.logOut') }}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </span>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'iHeaderUser',
    computed: {
      ...mapState('admin/user', [
        'info'
      ]),
      ...mapState('admin/layout', [
        'isMobile',
        'logoutConfirm'
      ])
    },
    methods: {
      ...mapActions('admin/account', [
        'logout'
      ]),
      handleClick (name) {
        if (name === 'logout') {
          this.logout({
            confirm: this.logoutConfirm,
            vm: this
          })
        }
      }
    }
  }
</script>
