<template>
  <div class="page-setup-profile-safety">
    <!-- <h3>安全設置</h3> -->

    <div class="ivu-mt ivu-pl ivu-pr">
      <!-- 修改密碼 -->
      <Row type="flex" justify="center" align="middle">
        <Col span="20">
            <h4 class="profile-safety-item-title">密碼</h4>
            <p v-show="editType !== 'password'" class="i-desc-paragraph">修改密碼</p>
        </Col>
        <Col span="4" class="ivu-text-right">
            <i-link v-show="!editType" link-color @click.native="changeEditType('formPassword')">設定</i-link>
        </Col>
        <Col span="24" v-if="editType === 'formPassword'">
          <Form
            class="ivu-mt ivu-pl ivu-pr"
            ref="formPassword"
            :model="formPassword"
            :rules="rulesPassword"
            :label-width="labelWidth"
            :label-position="labelPosition"
            hide-required-mark
            v-enter-focus
          >
            <FormItem label="密碼" prop="password">
              <Input ref="password" class="i-max-width-lg" v-model.trim="formPassword.password" type="password" placeholder="請輸入密碼" v-focus/>
            </FormItem>
            <FormItem label="新密碼" prop="newPassword">
              <Input class="i-max-width-lg" v-model.trim="formPassword.newPassword" type="password" placeholder="請輸入新密碼"/>
            </FormItem>
            <FormItem label="確認密碼" prop="newPasswordCheck">
              <Input class="i-max-width-lg" v-model.trim="formPassword.newPasswordCheck" type="password" placeholder="請確認新密碼"/>
            </FormItem>
            <FormItem class="ivu-mb-0">
              <Button class="ivu-mr-8" :disabled="loadingSubmit" @click="cancelEdit('formPassword')">取消</Button>
              <Button enter-focus="submit" type="success" :loading="loadingSubmit" @click="submitHandler('formPassword')">保存</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Divider />

      <!-- 修改二步驟驗證 -->
      <Row type="flex" justify="center" align="middle">
        <Col span="20">
            <h4 class="profile-safety-item-title">二步驟驗證</h4>
            <p v-show="editType !== 'auth'" class="i-desc-paragraph">綁定手機驗證器，使帳號更安全</p>
        </Col>
        <Col span="4" class="ivu-text-right">
            <i-link v-show="!editType" link-color @click.native="changeEditType('formAuthChange')">設定</i-link>
        </Col>
        <Col span="24" v-if="editType === 'formAuthChange'">
          <Form
            v-if="!verifyImgSrc"
            class="ivu-mt ivu-pl ivu-pr"
            ref="formAuthChange"
            :model="formAuthChange"
            :rules="rulesAuthChange"
            :label-width="labelWidth"
            :label-position="labelPosition"
            hide-required-mark
            v-enter-focus
            @submit.native.prevent
          >
            <FormItem label="密碼" prop="password">
              <Input ref="authPassword" class="i-max-width-lg" v-model.trim="formAuthChange.password" type="password" placeholder="密碼" v-focus/>
            </FormItem>
            <FormItem v-if="user['是否兩段式'] === 1" label="修改原因" prop="reason">
              <Input class="i-max-width-lg" v-model.trim="formAuthChange.reason"  placeholder="修改原因"/>
            </FormItem>
            <FormItem class="ivu-mb-0">
              <Button class="ivu-mr-8" :disabled="loadingSubmit" @click="cancelEdit('formAuthChange')">取消</Button>
              <Button enter-focus="submit" type="success" :loading="loadingSubmit" @click="submitHandler('formAuthChange')">下一步</Button>
            </FormItem>
          </Form>

          <Form
            v-else
            class="ivu-mt ivu-pl ivu-pr"
            ref="formAuthSave"
            :model="formAuthSave"
            :rules="rulesAuthSave"
            :label-width="labelWidth"
            :label-position="labelPosition"
            hide-required-mark
            @submit.native.prevent
          >
            <div style="margin: 0 0 10px 90px">
              <img :src="verifyImgSrc">
              <p class="i-desc-paragraph">掃 QR Code 綁定驗證器後, 請輸入新的動態密碼。</p>
            </div>
            <FormItem prop="verifyCode">
              <Input ref="authVerifyCode" class="i-max-width-lg" v-model.trim="formAuthSave.verifyCode" placeholder="動態密碼" :maxlength="6" v-focus/>
            </FormItem>
            <FormItem class="ivu-mb-0">
              <Button class="ivu-mr-8" :disabled="loadingSubmit" @click="cancelEdit('formAuthSave')">取消</Button>
              <Button type="success" :loading="loadingSubmit" @click="submitHandler('formAuthSave')">驗證</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import mixin from './mixins'

  // import { CHANGE_G_AUTH, SAVE_G_AUTH } from '@/grpc/api/sys.js'
  // import { SAVE_USER } from '@/grpc/api/user.js'

  import { newPasswordValidate, checkPassword } from '@/plugins/validate'

  export default {
    name: 'setup-profile-safety',
    mixins: [ mixin ],
    props: {
      user: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        formPassword: {
          password: '',
          newPassword: '',
          newPasswordCheck: ''
        },
        rulesPassword: {
          password: [
            { required: true, message: '請輸入密碼', trigger: 'blur' }
          ],
          newPassword: [
            { validator: newPasswordValidate, msg: '請新輸入密碼', vm: this, formName: 'formPassword', checkField: 'password', trigger: 'blur' }
          ],
          newPasswordCheck: [
            { validator: checkPassword, vm: this, formName: 'formPassword', checkField: 'newPassword', trigger: 'blur' }
          ]
        },

        formAuthChange: {
          password: '',
          reason: ''
        },
        rulesAuthChange: {
          password: [
            { required: true, message: '請輸入密碼', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '請輸入修改原因', trigger: 'blur' }
          ]
        },

        formAuthSave: {
          verifyCode: ''
        },
        rulesAuthSave: {
          verifyCode: [
            { required: true, message: '請輸入動態密碼', trigger: 'blur' }
          ]
        },

        editType: '',
        verifyImgSrc: '',

        loadingSubmit: false
      }
    },
    methods: {
      ...mapActions('admin/account', [
        'logout'
      ]),
      changeEditType (name) {
        this.editType = name
      },
      cancelEdit (name) {
        this.editType = ''
        this.$refs[name].resetFields()

        if (name === 'formAuthSave') {
          this.formAuthChange.password = ''
          this.formAuthChange.reason = ''
          this.verifyImgSrc = ''
        }
      },
      saveUserPassword () {
        SAVE_USER({
          password: this.formPassword.password,
          newPassword: this.formPassword.newPassword
        })
          .then(() => {
            this.logout({ success: '密碼變更成功，請重新登入。' })
          })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message,
              onOk: () => {
                this.$refs.formPassword.resetFields()
                this.$refs.password.focus()
              }
            })
          })
          .finally(() => {
            this.loadingSubmit = false
          })
      },
      authChange () {
        // 取得新的二步驟驗證 QR Code
        CHANGE_G_AUTH(this.formAuthChange)
          .then(response => {
            this.verifyImgSrc = response
          })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message,
              onOk: () => {
                this.$refs.formAuthChange.resetFields()
                this.$refs.authPassword.focus()
              }
            })
          })
          .finally(() => {
            this.loadingSubmit = false
          })
      },
      authSave () {
        // 重新綁定二步驟驗證
        SAVE_G_AUTH({
          password: this.formAuthChange.password,
          reason: this.formAuthChange.reason,
          verifyCode: this.formAuthSave.verifyCode
        })
          .then(() => {
            this.logout({ success: '二步驟驗證變更成功，請重新登入。' })
          })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message,
              onOk: () => {
                this.$refs.formAuthSave.resetFields()
                this.$refs.authVerifyCode.focus()
              }
            })
          })
          .finally(() => {
            this.loadingSubmit = false
          })
      },
      submitHandler (name) {
        this.$refs[name].validate(valid => {
          if (!valid) return

          this.loadingSubmit = true
          if (name === 'formAuthChange') {
            this.authChange()
          } else if (name === 'formAuthSave') {
            this.authSave()
          } else if (name === 'formPassword') {
            this.saveUserPassword()
          }
        })
      }
    }
  }
</script>
