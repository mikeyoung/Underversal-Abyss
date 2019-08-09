<template>
    <ul class="tunnelCards">
        <div class="activeTunnelCard">
          <h3>{{ this.activeTunnelCard.type }}</h3>
        </div>
        <li
            v-for="(card) in this.tunnel"
            :key="card.id"
            v-bind:class="card.status"
            v-bind:id="card.id">{{ card.value }} / {{ card.status }}</li>
    </ul>
</template>

<script>

export default {
  name: 'TunnelDisplay',
  data () {
    return {
      title: 'Tunnel Display'
    }
  },
  props: [
    'tunnel',
    'activeTunnelCard'
  ]
}
</script>

<style scoped>
  /* Set to be visible for debugging */

  .tunnelCards {
    display: none;
  }
</style>
