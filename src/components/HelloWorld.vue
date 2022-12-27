<template>
  <DropZone ref="dropzone" :maxFiles="3" url="https://localhost:44331/api/File" :uploadOnDrop="false"
    :multipleUpload="true" :acceptedFiles="['image', 'doc', 'zip', 'png']"  :parallelUpload="3"
    @addedFile="onFileAdd" @sending="onSending"/>
    
  <br />
  <button @click="onUpload">Upload</button>

</template>
<script>
import Dropzone from 'dropzone';
export default {
  name: 'HelloWorld',
  data(){
    return{
      dropzone: null,
     filePath:[]
    }
  },
  props: {
    msg: String
  },
  mounted() {
    this.dropzone = new Dropzone('form.dropzone', {
      url: 'https://localhost:44331/api/File',
      renameFile: function(file) {
        return file.id+'_'+file.name;
      }
    });
  },
  methods: {
    onFileAdd: function (item) {
      this.filePath=[];
      item.file.id=item.id;
      this.filePath.push(item);
      this.dropzone.renameFile(item.file);
      console.log(item);
    },
    onrenameFile:function(file){
      let newName = file.id + '_' + file.name;
      return newName;
    },
    onSending: function (files, xhr, formData) {
      formData.append('fileDetails', JSON.stringify(this.filePath));
      // formData.append('folderId', '23');
      // formData.append('fileId', '2');
      // formData.append('moduleName', 'DocStorage');
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
<style>
.dz-default,.dz-preview{
  display: none !important;
}
</style>
