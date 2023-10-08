<template>
  <div>
    <h1>To Do List</h1>
    <div v-if="tasks.length">
      <div v-for="task in tasks" :key="task.id">
        <div
          class="task-details"
          :style="{ backgroundColor: task.label.labelColor }"
        >
          <div class="task-container">
            <!-- Div para mostrar el color del label -->
            <!-- Radio button para el estado de la tarea -->
            <input type="radio" :checked="task.status" disabled />
            <!-- Mostrar el nombre de la tarea -->
            <h2>{{ task.taskName }}</h2>
            <!-- Mostrar la fecha de vencimiento -->
            <p>Due Date: {{ task.dueDate }}</p>
            <!-- Mostrar el tiempo de finalización si el estado es true -->
            <p v-if="task.status">Completion Time: {{ task.completionTime }}</p>
            <!-- Mostrar el nombre del label -->
            <p>Label: {{ task.label.labelName }}</p>
            <!-- Botón para editar la tarea y redirigir a /EditTask -->
            <router-link
              :to="{ name: 'EditTasks', params: { taskId: task.taskId } }"
            >
              <button>Editar Tarea</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading tasks...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    // Reemplaza la URL con la de tu API
    fetch("http://localhost:8080/api/v1/tasks/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        this.tasks = data;
        console.log("Respuesta del backend:", data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  },
};
</script>

<style>
.task-container {
  padding: 15px;
  align-content: center;
}
.task-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px; /* Agrega margen inferior para separar los elementos */
  border-radius: 30px;
  align-items: center;
}

.label-color {
  width: 100%;
  height: 10px;
  background-color: #3498db; /* Color de ejemplo, reemplaza con task.label.labelColor */
  margin-bottom: 300px; /* Agrega margen inferior para separar los elementos */
}

/* Agrega estilos adicionales según tus preferencias */
</style>
