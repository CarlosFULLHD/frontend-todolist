<template>
  <div>
    <div v-for="(label, index) in labels" :key="index">
      <div class="label-container">
        <input type="color" v-model="label.labelColor" />
        {{ labels.labelName }}
        <input
          type="text"
          v-model="label.labelName"
          placeholder="Nombre de la etiqueta"
        />
        <LabelsEdit
          :label="label"
          :index="index"
          @borrar="eliminarEtiqueta(index)"
          @actualizar="actualizarEtiqueta(index, $event)"
        />
      </div>
    </div>
    <button @click="nuevaEtiqueta">Nuevo label</button>
    <button @click="guardarEtiquetas">Guardar</button>
    <button @click="cancelar">Cancelar</button>
  </div>
</template>

<script>
import LabelsEdit from "./LabelsEdit.vue";
export default {
  components: {
    LabelsEdit,
  },
  data() {
    return {
      labels: [], // Almacena las etiquetas recuperadas de la API
      labelsOriginal: [], // Almacena las etiquetas originales antes de editar
    };
  },
  created() {
    // Llama a fetchLabels para cargar las etiquetas al iniciar el componente
    this.fetchLabels();
  },
  methods: {
    fetchLabels() {
      // Realiza la solicitud GET para obtener las etiquetas de la API
      fetch("http://localhost:8080/api/v1/labels/")
        .then((res) => res.json())
        .then((data) => {
          this.labels = data;
          this.labelsOriginal = JSON.parse(JSON.stringify(data)); // Copia las etiquetas originales
        })
        .catch((error) => {
          console.error("Error al obtener etiquetas:", error);
        });
    },
    nuevaEtiqueta() {
      // Agrega una nueva etiqueta vacía a la lista
      this.labels.push({
        labelName: "",
        labelColor: "#000000", // Valor por defecto del color
        newLabel: true, // Marca la etiqueta como nueva
      });
    },
    eliminarEtiqueta(index) {
      const confirmar = window.confirm(
        "¿Estás seguro de que deseas eliminar esta etiqueta?"
      );
      if (confirmar) {
        const labelId = this.labels[index].labelId;
        if (labelId) {
          // Solo intenta eliminar etiquetas existentes en el servidor
          // Realiza una solicitud DELETE para eliminar la etiqueta por ID
          fetch(`http://localhost:8080/api/v1/labels/${labelId}`, {
            method: "DELETE",
          })
            .then(() => {
              this.labels.splice(index, 1); // Elimina la etiqueta localmente
            })
            .catch((error) => {
              console.error("Error al eliminar etiqueta:", error);
            });
        } else {
          this.labels.splice(index, 1); // Elimina la etiqueta localmente si no tiene ID
        }
      }
    },
    actualizarEtiqueta(index, updatedLabel) {
      // Actualiza una etiqueta localmente con los datos actualizados
      this.labels[index] = updatedLabel;
    },
    guardarEtiquetas() {
      const etiquetasNuevas = this.labels.filter((label) => label.newLabel);
      const etiquetasEditadas = this.labels.filter(
        (label, index) =>
          label !== this.labelsOriginal[index] && !label.newLabel
      );

      // Actualiza las etiquetas editadas en el servidor (PUT)
      etiquetasEditadas.forEach((label) => {
        const labelId = label.labelId;
        if (labelId) {
          // Solo intenta actualizar etiquetas existentes en el servidor
          // Realiza una solicitud PUT para actualizar la etiqueta por ID
          fetch(`http://localhost:8080/api/v1/labels/${labelId}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              labelName: label.labelName,
              labelColor: label.labelColor,
            }),
          })
            .then(() => {
              // Etiqueta actualizada con éxito, no es nueva
              label.newLabel = false;
            })
            .catch((error) => {
              console.error("Error al actualizar etiqueta:", error);
            });
        }
      });

      // Crea etiquetas nuevas en el servidor (POST)
      etiquetasNuevas.forEach((label) => {
        fetch("http://localhost:8080/api/v1/labels/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            labelName: label.labelName,
            labelColor: label.labelColor,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // Actualiza el ID de la etiqueta nueva con el ID asignado por el servidor
            label.labelId = data.labelId;
            label.newLabel = false;
          })
          .catch((error) => {
            console.error("Error al crear etiqueta:", error);
          });
      });
      window.history.back();
    },
    cancelar() {
      // Restaura las etiquetas originales
      this.labels = JSON.parse(JSON.stringify(this.labelsOriginal));
      window.history.back();
    },
  },
};
</script>

<style scoped>
.label-container {
  margin-bottom: 10px;
}
</style>
