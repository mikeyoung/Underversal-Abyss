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
// import Velocity from 'velocity-animate'

export default {
  name: 'TunnelDisplay',
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  },
  props: [
    'tunnel',
    'activeTunnelCard'
  ]
}
</script>
