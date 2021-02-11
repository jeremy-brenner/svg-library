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
import fileCacheStore from '../stores/FileCacheStore.js';

export default {
  name: 'SVGList',
  components: {
    SVGItem
  },
  data() {
    return {
       fileList: fileCacheStore.get()
    }
  }
}
</script>
