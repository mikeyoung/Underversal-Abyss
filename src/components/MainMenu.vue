<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <img src="../assets/img/underversal_logo_home.jpg" class="homeLogo" />
      </div>
      <ul>
        <li>
          <router-link to="/rules">Go to Rules</router-link>
        </li>
        <li>
          <router-link to="/">Go to Main Menu</router-link>
        </li>
        <li>
          <router-link to="/game">Go to Game</router-link>
        </li>
      </ul>
    </div>
  </div>
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
  }
</style>
