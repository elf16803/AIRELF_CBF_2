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
          <Form ref="formLogin" :model="formLogin" :rules="rulesLogin" v-enter-focus>
            <FormItem prop="account">
              <Input ref="account" v-model="formLogin.account" size="large" placeholder="帳號">
                <Icon custom="fas fa-user" slot="prefix"/>
              </Input>
            </FormItem>

            <FormItem prop="password">
              <Input ref="password" v-model="formLogin.password" type="password" size="large" placeholder="密碼">
                <Icon custom="fas fa-lock" slot="prefix"/>
              </Input>
            </FormItem>

            <FormItem prop="verifyCode">
              <Row :gutter="12">
                <Col span="16">
                  <Input v-model="formLogin.verifyCode" size="large" placeholder="驗證碼">
                    <Icon custom="fas fa-key" slot="prefix"/>
                  </Input>
                </Col>
                <Col span="8">
                  <Button
                    class="page-account-content-verify-button"
                    size="large"
                    long
                    @click="getVailImgHandler()"
                  >
                    <img v-show="!loading.verifyImg" :src="verifyImgSrc">
                  </Button>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Checkbox v-model="formLogin.isRememberAccount">記住帳號</Checkbox>
            </FormItem>

            <FormItem class="ivu-mb-0">
                <Button
                  enter-focus="submit"
                  type="primary"
                  :loading="loading.submit"
                  size="large"
                  long
                  @click="submitHandler"
                >
                  登入
                </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { privateDecryptFront } from '@/plugins/js-encrypt'
  import storage from '@/libs/storage'

  export default {
    name: 'account-login',
    data () {
      return {
        formLogin: {
          account: '',
          password: '',
          verifyCode: '',
          isRememberAccount: false,
          loginBeforeToken: ''
        },
        rulesLogin: {
          account: [
            { required: true, message: '請輸入帳號', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '請輸入密碼', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '請輸入驗證碼', trigger: 'blur' }
          ]
        },
        verifyImgSrc: '',

        loading: {
          verifyImg: false,
          submit: false
        }
      }
    },
    methods: {
      ...mapActions('admin/account', ['getVailImg','login','autoLogin' ]),
      htmlDecode (s) {
        let div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
      },
      submitHandler () {
        this.$refs.formLogin.validate(valid => {
          if (!valid) return

          this.loading.submit = true
          this.login(this.formLogin)
            .catch(error => {
              this.$Modal.error({
                title: '錯誤訊息',
                content: error.message,
                onOk: () => {
                  if (error.message.match('密碼') || error.message.match('驗證碼')) {
                    this.formLogin.password = ''
                    this.formLogin.verifyCode = ''
                    this.$refs.password.focus()
                  } else {
                    this.$refs.formLogin.resetFields()
                    this.$refs.account.focus()
                  }
                }
              })

              this.getVailImgHandler()
            })
            .finally(() => {
              this.loading.submit = false
            })
        })
      },
      getVailImgHandler () {
        this.loading.verifyImg = true

        this.getVailImg()
          .then(({ imgSrc, loginBeforeToken }) => {
            this.verifyImgSrc = imgSrc
            this.formLogin.loginBeforeToken = loginBeforeToken
          })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message
            })
          })
          .finally(() => {
            this.loading.verifyImg = false
          })
      }
    },
    async mounted () {
      const rememberAccount = await this.$store.dispatch('admin/db/get', {
        dbName: 'sys',
        path: 'user.RID'
      })

      if (rememberAccount) {
        this.formLogin.account = privateDecryptFront(rememberAccount)
        this.formLogin.isRememberAccount = true
        this.$refs.password.focus()
      } else {
        this.$refs.account.focus()
      }

      this.getVailImgHandler()
    },
    created(){
      const token = this.htmlDecode(this.$route.query.token).replaceAll('{a}','+');
      storage.set('auto', token);
      this.autoLogin();
    },
  }
</script>
