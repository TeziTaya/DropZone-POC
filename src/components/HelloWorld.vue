<template>
    <DropZone 
       ref="dropzone"
        :maxFiles="Number(10000000000)"
        url="https://localhost:44331/api/File"
        :uploadOnDrop="false"
        :multipleUpload="true"
        :acceptedFiles="['image','doc','video','png']"
        @sending="onSending"
        :parallelUpload="3"/>
        <br />
        <button @click="onUpload" >Upload</button>

</template>

<script>
export default {
  name: 'HelloWorld',  
  props: {
    msg: String
  },
  methods:{
    onSending:function(files,xhr,formData){
      formData.append('folderId','23');
      formData.append('fileId','2');
      formData.append('moduleName','DocStorage');
    },
    onUpload(){
      this.$refs.dropzone.processQueue();
    }
  }
}
</script>

