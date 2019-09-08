<template>
  <div class="row">
    <div class="col-sm-12 col-lg-6">
      <img src="/underversal/static/img/rest.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-sm-12 col-lg-6">
      <h3 class="cardTitle">Rest</h3>
      <p>You have found a dark corner with a living massage chair that sprays nutrients.<br><br>Hit Points +1.</p>
      <button type="button" v-on:click="drawTunnelCard();" v-if="drawTunnelCardEnabled">Draw Tunnel Card</button>
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
