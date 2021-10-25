<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar'

export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style>
body {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
.content-wrapper {
  padding:20px;
}
</style>
