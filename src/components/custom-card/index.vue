<template>
  <div class="custom-card" :class="{ small: titleSmall }">
    <div class="custom-card-header" v-bg-color="titleBgColor">
      <div v-if="icon" class="custom-card-header-icon">
        <Icon :custom="icon"/>
      </div>

      <h4 class="custom-card-header-title">
        {{ title }}
      </h4>
    </div>

    <div class="custom-card-body">
      <slot></slot>
    </div>

    <div v-if="help" class="custom-card-help">
      <Icon custom="far fa-question-circle" @click="onClickHelp"/>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'custom-card',
    props: {
      title: {
        type: String,
        default: ''
      },
      titleBgColor: {
        type: String,
        default: ''
      },
      titleSmall: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      help: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapMutations('data/help', [
        'triggerDrawer',
        'setHelpTitle'
      ]),

      onClickHelp () {
        this.triggerDrawer(true)
        this.setHelpTitle(this.title)
      }
    }
  }
</script>
