<template>
    <div class="page-account">
      <div class="page-account-wrap">
        <div class="page-account-header">
          <div class="page-account-header-logo">
            <img src="@/assets/images/logo.png" alt="logo">
          </div>
          <div class="page-account-header-title">
            一路發報關系統
          </div>
        </div>

        <div class="page-account-content">
          <Form ref="formVerify" :model="formVerify" :rules="rulesVerify" @submit.native.prevent v-enter-focus>
            <FormItem prop="verifyCode">
              <Input
                ref="verifyCode"
                v-focus
                v-model="formVerify.verifyCode"
                size="large"
                placeholder="二步驟驗證碼"
                :maxlength="6"
              >
                <Icon custom="fas fa-key" slot="prefix"/>
              </Input>
            </FormItem>
            <FormItem class="ivu-mb-0">
                <Button enter-focus="submit" type="primary" size="large" :loading="loadingSubmit" long @click="submitHandler()">驗證</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import storage from '@/libs/storage'

  export default {
    name: 'account-verify',
    data () {
      return {
        formVerify: {
          verifyCode: ''
        },
        rulesVerify: {
          verifyCode: [
            { required: true, message: '請輸入二步驟驗證碼', trigger: 'blur' }
          ]
        },
        loadingSubmit: false
      }
    },
    methods: {
      ...mapActions('admin/account', ['loginAuth']),
      submitHandler () {
        this.$refs.formVerify.validate(valid => {
          if (!valid) return

          if (!storage.get('gid')) {
            this.$router.replace('/login')
            return
          }

          this.loadingSubmit = true
          this.loginAuth(this.formVerify)
            .catch(error => {
              this.$Modal.error({
                title: '錯誤訊息',
                content: error.message,
                onOk: () => {
                  this.$refs.formVerify.resetFields()
                  this.$refs.verifyCode.focus()
                }
              })
            })
            .finally(() => {
              this.loadingSubmit = false
            })
        })
      }
    },
    created () {
      if (!storage.get('gid')) {
        this.$router.replace('/login')
      }
    },
    beforeDestroy () {
      storage.remove('gid')
    }
  }
</script>
