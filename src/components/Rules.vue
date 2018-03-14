<template>
  <div class="container">
    <div class="row">
      <div class="col-12">{{ title }}</div>
    </div>
      <ul>
        <li>
          <router-link to="/rules">Go to Rules</router-link>
        </li>
        <li>
          <router-link to="/">Go to Main Menu</router-link>
        </li>
      </ul>
    <div class="row">
      <div class="col-sm-12 col-md-2">Stats</div>
      <div class="col-sm-12 col-md-10">Game Area</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules',
  data () {
    return {
      title: 'Rules'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
