<template>
  <div>
    <h1>Monster</h1>
  </div>
</template>

<script>
export default {
  name: 'MonsterCard',
  data () {
    return {
      title: 'Monster'
    }
  },
  props: [
    'character'
  ]
}
</script>

<style scoped>

</style>
