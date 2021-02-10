<template>
  <img 
    v-if="svgFile.urlData && svgFile.visible"
    :title="svgFile.path"
    :src="svgFile.urlData"
    :style="myStyle"
  >
</template>

<script>
import settingsStore from '../stores/SettingsStore.js';

export default {
  name: 'SVGItem',
  props: ['file'],
  data() {
    return {
      svgFile: this.file,
      svgSize: 50
    }
  },
  computed: {
    myStyle() {
      return {
        width:  `${this.svgSize}px`,
        height:  `${this.svgSize}px`
      }    
    }
  },
  mounted() {
    this.svgSize = settingsStore.getSvgSize();
    settingsStore.on('svgSize', size => this.svgSize = size);
  }
}
</script>

<style scoped>

</style>