<template>
  <div id="app">
    <Settings />
    <Search />
    <SVGList />
  </div>
</template>

<script>
import Settings from './components/Settings.vue';
import SVGList from './components/SVGList.vue';
import Search from './components/Search.vue';

export default {
  name: 'App',
  components: {
    Settings,
    SVGList,
    Search
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
