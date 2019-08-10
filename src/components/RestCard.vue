<template>
  <div class="row">
    <div class="col-6">
      <img src="../assets/img/rest.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-6">
      <h3>Rest</h3>
      <p>You have found a dark corner with a living massage chair that leaks foul smelling nutrients.  Hit points +1.</p>
      <button type="button" v-on:click="drawTunnelCard()" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
    </div><!-- .col 6 -->
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
    'drawTunnelCardEnabled',
    'drawTunnelCard'
  ]
}
</script>

<style scoped>

</style>
