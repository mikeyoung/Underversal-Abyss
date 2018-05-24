<template>
    <ul class="tunnelCards">
        <div class="activeTunnelCard">
          <h3>{{ this.activeTunnelCard.type }}</h3>
        </div>
        <li
            v-for="(card) in this.tunnel"
            :key="card.id"
            v-bind:class="{
                discarded: card.status === 'discard',
                play: card.status === 'play'}"
            v-bind:id="card.id">{{ card.value }} / {{ card.status }}</li>
    </ul>
</template>

<script>
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
