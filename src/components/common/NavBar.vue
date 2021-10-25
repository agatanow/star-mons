<template>
  <div class="navigation-bar">
    <router-link to="/pokemons"> pokemons </router-link>
    <router-link to="/star-wars"> star wars </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  position: sticky;
  top: 0;
  width: 100%;
  background:black;
  padding: 10px;
  a{
    padding: 0 10px;
    color:white;
    text-decoration: none;
    &:hover, &:focus {
      color:pink;
    }
  }
}
</style>

