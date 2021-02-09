<template>
  <div id='settings'>
    <button id="toggle-settings" @click="toggleSettings">Settings</button>
    <div id='settings-window' v-if="open">
      <div>Settings</div>
      <input 
        type=text 
        v-model="dir"
        v-on:keyup.enter="addLibrary"
      >
      <button @click="addLibrary">add</button>
      <div 
        v-for="library in libraries"
        :key="library"
       >
         {{ library }}
         <button @click="removeLibrary(library)">remove</button>
       </div>
    </div>
  </div>    
</template>
<script>
import settingsStore from '../stores/SettingsStore.js';
const path = require('path');

export default {
  name: 'Settings',
  components: {
  
  },
  data() {
    return {
      libraries: settingsStore.getLibraries(),
      dir: '',
      open: false
    }
  },
  methods: {
    addLibrary() {
      settingsStore.addLibrary(path.join(this.dir,'/'));
      this.dir = '';
    },
    removeLibrary(dir) {
      settingsStore.removeLibrary(dir)
    },
    toggleSettings() {
      this.open = !this.open;
    }
  }
}
</script>
<style scoped>
#settings {
  position: relative;
}
#settings-window {
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
#toggle-settings {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>