<template>
  <div>
    <input v-model="labelName" placeholder="Nombre de la etiqueta" />
    <button @click="eliminarEtiqueta">Borrar</button>
  </div>
</template>

<script>
export default {
  props: ["labelName"],
  methods: {
    eliminarEtiqueta() {
      this.$emit("borrar", this.labelName);
    },
  },
};
</script>
