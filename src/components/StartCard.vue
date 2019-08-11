<template>
  <div class="row">
    <div class="col-6">
      <img src="../../static/img/start.jpg" class="cardImage" />
    </div><!-- .col 6 -->
    <div class="col-6">
      <h3 class="cardTitle">Start</h3>
      <p>Today is a good day.  Today the taskmaster has told you that you may abandon your duties in the mines if you can pass a simple test.  You must deliver a single gold piece to The Gatekeeper who may be found at the end of a cursed underground tunnel.</p>
      <p>With gold in hand you wave goodbye to your cellmates who have become the only friends you have.</p>
      <button type="button" v-on:click="startGame();">Enter Tunnel</button>
    </div><!-- .col 6 -->
  </div>
</template>

<script>
export default {
  name: 'StartCard',
  data () {
    return {
      title: 'Start'
    }
  },
  props: [
    'startGame'
  ]
}
</script>

<style scoped>
  button[disabled] {
    opacity: .25
  }
</style>
