<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="game-panel">
    <div class="card mt-5">
      <div class="card-content">
        <div class="content">
          ¡ADIVINA EL ANIME DE HOY!
          <br />
          <br />
          <br />
          <p>Escribe cualquier carácter para empezar.</p>
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">Pista 1</span>
        <span class="card-footer-item">Pista 2</span>
        <span class="card-footer-item">Pista 3</span>
      </footer>
    </div>
    <fieldset class="input-flex-group mx-3">
      <input class="input mb-1" type="text" placeholder="Nombra un anime" />
      <button class="button icon-button">
        <span class="icon">
          <i class="mdi mdi-arrow-right" />
        </span>
      </button>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
.game-panel {
  width: 30%;
  height: 100%;
}

.button {
  margin: 0.5rem auto;
}

.input-flex-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  width: auto;
  justify-content: space-between;
  align-items: flex-end;

  &--general-data {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

/* stylelint-disable-next-line selector-class-pattern */
.section__row {
  &--left {
    width: 65%;
  }

  &--right {
    width: 35%;
  }
}
</style>
