<script setup>
  import Timer from "./components/timer.vue";
</script>

<template>
  <div class="app-container">
    <div class="header">
      <!-- header -->
    </div>
    <div class="center">
      <Timer></Timer>
    </div>
    <div class="footer">
      Background image from: <a href="https://www.vecteezy.com/free-vector/abstract-background">Vecteezy</a>
      icons from: <a href="https://www.flaticon.com">Flaticon</a>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('./assets/vecteezy_3d-modern-wave-curve-abstract-presentation-background-lines_13598682.svg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  padding: 1em 0;
  color: white;
}
.center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 1em 0;
  color: white;
}
</style>