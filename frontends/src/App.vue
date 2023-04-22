<template>
  <div>
    <NavBar />
    <RaspiData />
  </div>
</template>

<script>
import RaspiData from './components/RaspiData.vue';
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components: {
    RaspiData,
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
