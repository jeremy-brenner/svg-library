<template>
  <img 
    v-if="svgData"
    :title="url"
    :src="svgData"
  >
</template>

<script>
  const fs = require('fs');

export default {
  name: 'SVGItem',
  props: ['url'],
  data() {
    return {
      svgData: ''
    }
  },
  mounted() {
    fs.readFile(this.url, (e,f) => {
      if(e) {
        console.log(e)
      }
      this.svgData = `data:image/svg+xml;base64,${f.toString("base64")}`;
    });
  }
}
</script>

<style scoped>
  img {
    width: 50px;
    height: 50px;
  }
</style>