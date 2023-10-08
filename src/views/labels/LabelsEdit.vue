<template>
  <div>
    <input
      :value="label.labelName"
      placeholder="Nombre de la etiqueta"
      style="display: none"
    />
    <button @click="eliminarEtiqueta">Borrar</button>
  </div>
</template>

<script>
export default {
  props: ["label"],
  methods: {
    eliminarEtiqueta() {
      this.$emit("borrar");
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 54%;
}
</style>
