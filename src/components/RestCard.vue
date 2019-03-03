<template>
  <div>
    <h1>Rest</h1>
    <p>You find a corner to hide and heal your wounds.</p>
    <p>Health + 1</p>
  </div>
</template>

<script>
export default {
  name: 'RestCard',
  data () {
    return {
      title: 'Rest'
    }
  },
  props: [
    'character'
  ]
}
</script>

<style scoped>

</style>
