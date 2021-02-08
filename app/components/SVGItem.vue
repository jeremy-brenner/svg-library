<template>
  <img 
    :src="url" 
    :title="url"
  />
</template>

<script>
export default {
  name: 'SVGItem',
  props: ['url']
}
</script>

<style scoped>
  img {
    width: 50px;
    height: 50px;
  }
</style>