<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 text-center">
        <br>
        <div class="text-right nav-links">
            <router-link to="/game">Game</router-link> / <router-link to="/">Home</router-link>
        </div>
        <img class="img-fluid" src="/underversal/static/img/rules_chief.jpg" />
        <h2>Underversal Abyss</h2>
        <p>All art by Bonnie Banks.</p>
        <p>Game written by Mike Young to demonstrate <a href="https://vuejs.org/" target="_blank">VueJS</a> implementation.  Uses <a href="https://howlerjs.com/" target="_blank">Howler</a> for audio and <a href="http://velocityjs.org/" target="_blank">Velocity</a> for tweening CSS.  Most audio sourced from <a href="http://bbcsfx.acropolis.org.uk/" target="_blank">BBC Sound Effects</a> archive, with some clips of pet dog.</p>
        <img src="/underversal/static/img/dog.png" class="dog" />
      </div>
    </div><!-- .row -->
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      title: 'About'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  line-height: 1em;
  font-family: 'UnifrakturCook', cursive;
  font-size: 66px;
  display: block;
  -webkit-text-stroke: 1px #fff;
  color: #000;
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  text-align: center;
  margin: .5em auto;
}

a {
  color: #09C !important;
}

.nav-links a {
  color: #fff !important;
}

.dog {
  width: 150px;
  height: 150px;
  margin: 2em auto;
}
</style>
