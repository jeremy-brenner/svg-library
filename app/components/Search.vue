<template>
  <div>
    <input type="text" v-model="searchText" @input="doSearch"> {{ files.length }}
  </div>
</template>

<script>
import fileListStore from '../stores/FileListStore.js';

export default {
  name: 'Search',
  components: {

  },
  data() {
    return {
      searchText: '',
      files: fileListStore.get()
    }
  },
  methods: {
    doSearch() {
      fileListStore.filter(this.searchText);
    }
  }
}
</script>