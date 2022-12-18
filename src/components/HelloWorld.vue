<template>
  <DropZone ref="dropzone" :maxFiles="Number(10000000000)" url="https://localhost:44331/api/File" :uploadOnDrop="false"
    :multipleUpload="true" :acceptedFiles="['image', 'doc', 'video', 'png']"  :parallelUpload="3"
    @addedFile="onFileAdd" @sending="onSending" />
  <br />
  <button @click="onUpload">Upload</button>

</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
     filePath:[]
    }
  },
  props: {
    msg: String
  },
  methods: {
    onFileAdd: function (item) {
      this.filePath=[];
      this.filePath.push(item);
      console.log(item);
    },
    onSending: function (files, xhr, formData) {
      formData.append('fileDetails', JSON.stringify(this.filePath));
      formData.append('folderId', '23');
      formData.append('fileId', '2');
      formData.append('moduleName', 'DocStorage');
      // var items = event.dataTransfer.items;
      // for (var i = 0; i < items.length; i++) {
      //   var entry = items[i].webkitGetAsEntry();
      //   if (entry) {
      //     vm.traverse(vm,entry);
      //   }
      // }
    },
    traverse: function (vm,entry, path) {
      path = path || "";
      if (entry.isFile) {
        // Get file
        entry.file(function (file) {
          console.log("File:", path + file.name);
        });
      } else if (entry.isDirectory) {
        // Get folder contents
        var dirReader = entry.createReader();
        dirReader.readEntries(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            vm.traverse(vm,entries[i], path + entry.name + "/");
          }
        });
      }
    },
    onUpload() {
      this.$refs.dropzone.processQueue();
    }
  }
}
</script>

