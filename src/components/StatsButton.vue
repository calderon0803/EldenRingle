<script setup></script>
<template>
  <button class="fixed-button">
    <span class="mdi mdi-chart-bell-curve-cumulative mdi-24px"></span>
  </button>
</template>
<style lang="scss" scoped>
.fixed-button {
  position: fixed;
  bottom: 20px; /* Espacio desde el borde inferior */
  left: 20px; /* Espacio desde el borde derecho */
  padding: 15px;
  background-color: #f4980d;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
}

.fixed-button:hover {
  background-color: #e6262d;
}
</style>
