<template>
  <Icon class="previous" custom="fas fa-reply" color="#fff" size="24" @click="prevHandler"/>
</template>

<script>
  export default {
    name: 'previous',
    methods: {
      prevHandler () {
        this.$router.go(-1)
        this.$emit('click')
      }
    }
  }
</script>
