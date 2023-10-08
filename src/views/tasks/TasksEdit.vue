<template>
  <div v-if="task">
    <h1>Editar Tarea {{ taskId }}</h1>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <label for="taskName">Tarea</label>
        <input type="text" id="taskName" v-model="task.taskName" required />
      </div>
      <div class="form-group">
        <label for="dueDate">Fecha limite</label>
        <input
          type="datetime-local"
          id="dueDate"
          v-model="task.dueDate"
          required
        />
      </div>
      <div class="form-group">
        <label for="status">Completada</label>
        <input type="checkbox" id="status" v-model="task.status" />
      </div>
      <div class="form-group" v-if="task.status">
        <label for="completionTime">Completion Time</label>
        <input
          type="datetime-local"
          id="completionTime"
          v-model="task.completionTime"
        />
      </div>
      <div class="form-group">
        <label for="labelId">Etiqueta </label>
        <select id="labelId" v-model="task.label.labelId">
          <option
            v-for="label in labels"
            :key="label.labelId"
            :value="label.labelId"
          >
            {{ label.labelName }}
          </option>
        </select>
        <router-link to="/Labels">
          <button type="button">Editar Etiquetas</button>
        </router-link>
      </div>
      <button type="submit">Save</button>
      <router-link to="/Tasks">
        <button type="button">Cancelar</button>
      </router-link>
    </form>
  </div>
  <div v-else>
    <p>Loading task details...</p>
  </div>
</template>

<script>
export default {
  props: ["taskId"],
  data() {
    return {
      task: null,
      labels: [],
    };
  },
  mounted() {
    this.fetchTask();
    this.fetchLabels();
  },
  methods: {
    fetchTask() {
      fetch(`http://localhost:8080/api/v1/tasks/${this.taskId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          this.task = data;
          console.log("Task Details:", data);
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
        });
    },
    fetchLabels() {
      fetch("http://localhost:8080/api/v1/labels/")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          this.labels = data;
          console.log("Labels:", data);
        })
        .catch((error) => {
          console.error("Error fetching labels:", error);
        });
    },
    async updateTask() {
      try {
        // Crear un objeto con los datos de la tarea editada
        const editedTask = {
          taskName: this.task.taskName,
          dueDate: this.task.dueDate,
          status: this.task.status,
          completionTime: this.task.completionTime,
          labelId: this.task.label.labelId, // Id del label editado
        };

        // Realizar la solicitud PUT al servidor
        const response = await fetch(
          `http://localhost:8080/api/v1/tasks/${this.task.taskId}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTask),
          }
        );

        if (!response.ok) {
          // Manejar el caso en que la respuesta del servidor no sea exitosa
          console.error("Error al actualizar la tarea:", response.statusText);
          // Puedes mostrar un mensaje de error al usuario si lo deseas
        } else {
          // Manejar el caso en que la respuesta del servidor sea exitosa
          console.log("Tarea actualizada con éxito");
          // Puedes redirigir al usuario a la página de tareas o realizar otras acciones
        }
      } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        // Manejar errores de red u otros errores
      }
    },
  },
};
</script>

<style scoped>
input {
  margin: 5px;
}
button {
  margin-top: 15px;
}
</style>
