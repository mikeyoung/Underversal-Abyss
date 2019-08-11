<template>
  <div class="container">
    <div class="row">
      <div class="col-10 offset-1">
        <br>
        <router-link to="/game"><img src="../../static/img/underversal_logo_home.jpg" class="homeLogo" /></router-link>
        <br>
        <div class="text-center">
            <router-link to="/game">Game</router-link> /
            <router-link to="/about">About</router-link>
        </div>
      </div><!-- .col-12 -->
    </div><!-- .row -->
  </div><!-- .container -->
</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homeLogo {
    width: 100%;
    display: block;
    border: 0 none;
  }
</style>
