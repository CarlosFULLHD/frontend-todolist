<template>
  <div>
    <div v-for="(label, index) in labels" :key="index">
      <LabelsEdit :labelName="label" @borrar="borrarEtiqueta(index)" />
    </div>
    <button @click="nuevoLabel">Nuevo label</button>
    <button @click="guardarEtiquetas">Guardar</button>
    <button @click="cancelar">Cancelar</button>
  </div>
</template>

<script>
import Etiqueta from "./Etiqueta.vue";
import LabelsEdit from "./LabelsEdit.vue";

export default {
  components: {
    Etiqueta,
    LabelsEdit,
  },
  data() {
    return {
      labels: [],
      nuevaEtiqueta: "",
    };
  },
  methods: {
    guardarEtiquetas() {
      // En este método, puedes enviar una solicitud POST al backend
      // con la información de las etiquetas en this.labels
      // Puedes enviar todas las etiquetas en un solo POST o
      // enviar múltiples POSTs para cada etiqueta por separado,
      // dependiendo de tus requisitos de la aplicación.

      // Filtra los labels editados
      const labelsEditados = this.labels.filter(
        (label, index) => label !== this.labelsOriginal[index]
      );
      // Realiza una solicitud PUT para actualizar los labels editados.

      // Luego, crea solicitudes POST para los nuevos labels.
    },
    nuevoLabel() {
      this.labels.push("");
    },
    borrarEtiqueta(index) {
      this.labels.splice(index, 1);
    },

    cancelar() {
      // Lógica para cancelar la creación de etiquetas.
    },
  },
};
</script>
