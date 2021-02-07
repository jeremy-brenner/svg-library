
<template>
  <div>

    <div @click="toggleOpen">{{ position }} {{ fileCount }}</div>
    <div v-if="showChildren">
      <SVGItem 
        v-for="file in fileList" 
        :key="file"
        :url="file"
      />
      
      <DirList
      v-for="dir in dirList" 
      :key="dir" 
      :position="dirPosition(dir)"
      open="false"
      />
    </div>
  </div>
</template>

<script>

import SVGItem from './SVGItem.vue';
import fileListStore from '../stores/FileListStore.js';

export default {
  name: 'DirList',
  components: {
    SVGItem
  },
  props: {
    position: {
      type: String,
      default: ''
    },
    open: {
      type: String,
      default: "false",
    }
  },
  data() {
    return {
      filteredFileList: fileListStore.get(),
      showChildren: this.open == "true"
    }
  },
  computed: {
    myFiles() {
      return this.filteredFileList
        .filter(f => f.startsWith(this.position))
        .map(f => f.replace(this.position,''))
    },
    fileList() {
      return this.myFiles.filter(f => f.split('/').length == 1).map(f => `svgs/${this.position}${f}`)
    },
    fileCount() {
      return this.myFiles.length;
    },
    dirList() {
      const dirs = {};
      this.myFiles
        .forEach( f => {
          const dir = f.split('/').map((p,i,a) => i<a.length-1 ? `${p}/` : '' )[0];
          if(dir === '') {
            return;
          }
          dirs[dir] = true;
        });
      return Object.keys(dirs);
    }
  },
  methods: {
    dirPosition(dir) {
      if(this.position===''){
        return dir;
      }
      return this.position + dir
    },
    toggleOpen() {
      this.showChildren = !this.showChildren;
    }
  }
}
</script>

<style scoped>
  
</style>