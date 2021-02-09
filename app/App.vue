<template>
  <div id="app">
    <Settings />
    <input type="text" v-model="searchText" @input="doSearch">
   <!-- <DirList open="true" /> -->
{{ files.length }}
  </div>
</template>

<script>
import Settings from './components/Settings.vue'
import fileListStore from './stores/FileListStore.js';

export default {
  name: 'App',
  components: {
    Settings
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background:white;
  padding: 10px;
}
</style>
