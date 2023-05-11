<template lang="">
  <div class="page-upload">
    <Upload
      class="upload"
      :multiple="multiple"
      type="drag"
      action=""
      :before-upload="onBeforeUpload"
    >
      <div class="upload-inner" style="padding: 20px 0">
          <Icon custom="fas fa-cloud-upload-alt" size="52" style="color: #3399ff"></Icon>
          <p>點擊或拖曳檔案</p>
      </div>
    </Upload>

    <div
      v-for="file in uploadList"
    >
      {{ file.name }}
    </div>

  </div>
</template>
<script>
  export default {
    name: 'upload',
    data () {
      return {
        multiple: false,

        uploadList: [],
        upload: null
      }
    },
    methods: {
      onBeforeUpload (file) {
        if (this.multiple) {
          this.uploadList.push(file)
        } else {
          this.uploadList = []
          this.uploadList.push(file)
        }

        return false
      }
    }
  }
</script>

<style lang="less">
.page-upload{
  // .ivu-upload{
  //   height: calc(~"100vh - 134px");

  //   @media screen and(max-width: 576px){
  //     height: calc(~"100vh - 128px");
  //   }
  // }

  // .upload-inner{
  //   position: relative;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%,-50%);
  // }
}
</style>
