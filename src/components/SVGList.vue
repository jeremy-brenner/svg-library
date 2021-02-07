<template>
  <div>
      hi
  <div
   v-for="folder in folderList" 
   :key="folder"
  > 
    {{ folder }}
  </div>
  
 <!-- <SVGItem 
    v-for="svg in svgList" 
    :key="svg" 
    :url="svg"
  /> -->

  </div>
</template>

<script>

//import SVGItem from './SVGItem.vue';

const svgList = [];
const folderList = [];

fetch('svgList.json')
  .then(response => response.json())
  .then(data => {
      svgList.push(...data);

      const folders = {};
      data.forEach( file => {
        const parts = file.split('/');
        parts.pop();
        folders[parts.join('/')] = true;
      });
      folderList.push(...Object.keys(folders));
  });


export default {
  name: 'SVGList',
  components: {
   //   SVGItem
  },
  data() {
    return {
       svgList,
       folderList
    }
  }
}
</script>
