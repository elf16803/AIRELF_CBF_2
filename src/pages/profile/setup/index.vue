<template>
  <div class="page-profile-setup">
    <div v-if="!loading" >
      <Row :gutter="12">
        <Col :xl="6" :lg="6" :md="0" :sm="0" :xs="0">
          <custom-card title="個人設置" icon="fas fa-user-cog fa-fw">
            <CellGroup @on-click="changeCellHandler" class="ivu-pt-8 ivu-pb-8">
              <Cell title="基本設置" name="info" label="個人資料設置" :selected="currentType === 'info'" />
              <Cell title="安全設置" name="safety" label="二步驟驗證、密碼相關設置" :selected="currentType === 'safety'" />
            </CellGroup>
          </custom-card>
        </Col>

        <Col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
          <custom-card
            :title="contentCardTitle"
            :icon="isDesktop ? '' : 'fas fa-user-cog fa-fw'"
          >
              <Row>
                <Col :xl="0" :lg="0" :md="24" :sm="24" :xs="24">
                    <Tabs :value="currentType" @on-click="changeCellHandler">
                        <TabPane label="基本設置" name="info" />
                        <TabPane label="安全設置" name="safety" />
                    </Tabs>
                </Col>
            </Row>

            <component :ref="currentType" :is="currentType" :user="user" @updateInfo="saveUser"></component>
          </custom-card>
        </Col>
      </Row>
    </div>

    <Spin class="i-spin-full" v-show="loading" size="large" fix></Spin>
  </div>
</template>

<script>
  // import { GET_USER, SAVE_USER } from '@/grpc/api/user.js'

  import mixin from './mixins'
  import info from './info.vue'
  import safety from './safety.vue'

  export default {
    name: 'profile-setup',
    mixins: [ mixin ],
    components: {
      info,
      safety
    },
    data () {
      return {
        user: {},

        currentType: 'info',
        loading: false
      }
    },
    computed: {
      contentCardTitle () {
        if (!this.isDesktop) {
          return '個人設置'
        } else if (this.currentType === 'info') {
          return '基本設置'
        } else if (this.currentType === 'safety') {
          return '安全設置'
        }
      }
    },
    methods: {
      changeCellHandler (name) {
        this.currentType = name
      },
      saveUser ({ name, address, phone }) {
        this.$refs.info.loadingButton = true

        SAVE_USER({
          name,
          address,
          phone
        })
          .then(() => {
            this.$Modal.success({
              title: '成功訊息',
              content: '基本資料更新成功',
              onOk: () => {
                this.getUser()
              }
            })
          })
          .catch(error => {
            this.$refs.info.resetForm()
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message
            })
          })
          .finally(() => {
            this.$refs.info.loadingButton = false
          })
      },
      getUser () {
        this.loading = true

        GET_USER()
          .then(response => {
            this.user = response[0]
          })
          .catch(error => {
            this.$Modal.error({
              title: '錯誤訊息',
              content: error.message,
              onOk: () => {
                this.$router.replace('/home')
              }
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    created () {
      // this.getUser()
    }
  }
</script>
