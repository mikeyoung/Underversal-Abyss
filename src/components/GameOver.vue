<template>
  <div>
    <h1>Game Over</h1>
    <p>You have died.</p>
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
