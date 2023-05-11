<template>
  <div class="page-setup-profile-info">
    <!-- <h3>基本設置</h3> -->

    <Form
      class="ivu-mt ivu-pl ivu-pr"
      ref="formInfo"
      :model="formInfo"
      :rules="rulesInfo"
      :label-width="labelWidth"
      :label-position="labelPosition"
      hide-required-mark
      v-enter-focus
    >
      <FormItem label="姓名" prop="name">
        <Input class="i-max-width-md" v-model.trim="formInfo.name" v-focus/>
      </FormItem>
      <FormItem label="身分證字號">
        <Input class="i-max-width-md" :value="user['身分證字號']" readonly/>
      </FormItem>
      <FormItem label="地址" prop="address">
        <Input class="i-max-width-xxl" v-model.trim="formInfo.address" />
      </FormItem>
      <FormItem label="手機" prop="phone">
        <Input class="i-max-width-md" v-model.trim="formInfo.phone" />
      </FormItem>

      <FormItem>
        <Button enter-focus="submit" type="success" :loading="loadingButton" @click="submitHandler">保存更新</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import mixin from './mixins'
  import { isChinese, isPhone } from '@/plugins/validate'

  export default {
    name: 'setup-profile-info',
    mixins: [ mixin ],
    props: {
      user: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        formInfo: {
          name: '',
          address: '',
          phone: ''
        },
        rulesInfo: {
          name: [
            { validator: isChinese, msg: '請輸入姓名', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '請輸入地址', trigger: 'blur' }
          ],
          phone: [
            { validator: isPhone, msg: '請輸入手機', trigger: 'blur' }
          ]
        },
        loadingButton: false
      }
    },
    methods: {
      submitHandler () {
        this.$refs.formInfo.validate(valid => {
          if (!valid) return

          this.$emit('updateInfo', this.formInfo)
        })
      },
      resetForm () {
        this.$refs.formInfo.resetFields()
        this.formInfo.name = this.user['姓名']
        this.formInfo.address = this.user['地址']
        this.formInfo.phone = this.user['手機']
      }
    },
    mounted () {
      this.resetForm()
    }
  }
</script>
