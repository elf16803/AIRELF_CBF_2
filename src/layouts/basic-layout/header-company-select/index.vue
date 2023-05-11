<template>
  <span v-if="companyList.length > 1" class="i-layout-header-trigger i-layout-header-trigger-min">
    <Select v-model="company" @on-change="onChange">
      <Option
        v-for="company in companyList"
        :value="company['清關公司']"
        :key="company['清關公司']"
      >
        {{ company['名稱'] }}
      </Option>
    </Select>
  </span>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'iHeaderCompanySelect',
    data () {
      return {
        company: ''
      }
    },
    computed: {
      ...mapState('data/system', [
        'companyList'
      ])
    },
    methods: {
      ...mapActions('data/system', [
        'getCompanyList'
      ]),
      ...mapActions('admin/account', [
        'refreshToken'
      ]),
      onChange (companyId) {
        this.refreshToken({ companyId })
          .then(() => {
            if (this.$route.name !== 'home') {
              this.$router.replace('/home')
            }
            location.reload()
          })
      }
    },
    created () {
      this.getCompanyList()
        .then(({ companyDefault }) => {
          this.company = companyDefault
        })
        .catch(error => {
          this.$Modal.error({
            title: '錯誤訊息',
            content: error.message
          })
        })
    }
  }
</script>

<style lang="">

</style>
