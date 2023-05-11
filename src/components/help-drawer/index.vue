<template>
  <div>
    <Drawer
      class-name="help-drawer"
      :width="isMobile ? 100 : 400"
      :mask-closable="false"
      :value="openDrawer"
      @on-close="onClose"
      @on-visible-change="onVisibleChange"
    >
      <div slot="header">
        <Icon class="ivu-mr-8" custom="far fa-question-circle" />
        <h4>{{ helpTitle + '說明' }}</h4>
      </div>

      <!-- 內容 -->
      <i-quill v-if="isEdit" v-model="editorContent" />
      <div v-else class="help-drawer-content" v-html="helpContent"></div>

      <div class="help-drawer-footer">
        <template v-if="isEdit">
          <Button class="ivu-mr-8" @click="cancelEdit()">取消</Button>
          <Button type="success" @click="saveEdit()">保存</Button>
        </template>
        <template v-else>
          <Button @click="isEdit = true">修改</Button>
        </template>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'

  import iQuill from '@/components/quill'

  export default {
    name: 'help-drawer',
    components: {
      iQuill
    },
    data () {
      return {
        editorContent: '',
        isEdit: false
      }
    },
    computed: {
      ...mapState('admin/layout', ['isMobile']),
      ...mapState('data/help', [
        'openDrawer',
        'helpTitle',
        'helpContent'
      ])
    },
    methods: {
      ...mapMutations('data/help', ['triggerDrawer']),
      ...mapActions('data/help', ['saveHelp']),

      onClose () {
        this.triggerDrawer(false)
        this.cancelEdit()
      },
      onVisibleChange (value) {
        if (value) this.editorContent = this.helpContent
      },

      cancelEdit () {
        this.editorContent = this.helpContent
        this.isEdit = false
      },
      saveEdit () {
        this.saveHelp({
          content: this.editorContent
        })

        this.isEdit = false
      }
    }
  }
</script>
