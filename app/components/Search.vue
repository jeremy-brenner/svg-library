<template>
  <div>
    <input type="text" v-model="searchText" @input="doSearch"> 
    {{ shownFiles }} / {{ totalFiles }}
  </div>
</template>

<script>
import fileCacheStore from '../stores/FileCacheStore.js';

export default {
  name: 'Search',
  components: {

  },
  data() {
    return {
      searchText: '',
      files: fileCacheStore.get(),
      timeout: null
    }
  },
  computed: {
    totalFiles() {
      return this.files.length
    },
    shownFiles() {
      return this.files.filter(f => f.visible == true).length
    }
  },
  methods: {
    doSearch() {
      if(this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = false;
      }
      //this.timeout = setTimeout( () => fileListStore.filter(this.searchText), 300)
    }
  }
}
</script>