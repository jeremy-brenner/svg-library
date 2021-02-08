<template>
  <div id="app">
    <input type="text" v-model="searchText" @input="doSearch">
    <DirList open="true" />
  </div>
</template>

<script>
import DirList from './components/DirList.vue'
import fileListStore from './stores/FileListStore.js';

export default {
  name: 'App',
  components: {
    DirList
  },
  data() {
    return {
      searchText: ''
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
  margin-top: 60px;
}
</style>
