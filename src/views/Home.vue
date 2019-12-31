<template>
  <div class="home">

    <div class="map" id="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import AMap from "AMap"
export default {
  name: 'home',
  components: {

  },

  mounted() {

  }
}
</script>
<style scoped>
  div#map{
    height: 100vh;
    width: 100%;
  }
</style>
