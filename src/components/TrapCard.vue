<template>
  <div>
    <h1>Trap</h1>
    <p>The path ahead is clearly trapped.</p>
    <p>Roll 1d4.  If you roll a 1 or 2 you take that many points of damage.  On a 3 or 4 you bypass the trap unharmed.</p>
  </div>
</template>

<script>
export default {
  name: 'TrapCard',
  data () {
    return {
      title: 'Trap'
    }
  },
  props: [
    'character'
  ]
}
</script>

<style scoped>

</style>
