<template>
  <div>
    <SVGItem 
      v-for="(file, i) in fileList" 
      :key="i"
      :file="file"
    />
  </div>
</template>

<script>

import SVGItem from './SVGItem.vue';
import fileListStore from '../stores/FileListStore.js';

export default {
  name: 'SVGList',
  components: {
    SVGItem
  },
  data() {
    return {
       fileList: fileListStore.get()
    }
  }
}
</script>
