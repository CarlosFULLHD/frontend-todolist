<template>
  <div>
    <h1>To Do List</h1>
    <router-link :to="{ name: 'Login' }">
      <button @click="logout">Cerrar Sesión</button>
    </router-link>
    <div v-if="tasks.length">
      <div v-for="task in tasks" :key="task.id">
        <div
          class="task-details"
          :style="{ backgroundColor: task.label.labelColor }"
        >
          <div class="task-container">
            <!-- Div para mostrar el color del label -->
            <!-- Radio button para el estado de la tarea -->
            <input
              type="radio"
              :checked="task.status"
              @click="toggleTaskStatus(task)"
              class="custom-radio"
            />
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
      <router-link :to="{ name: 'EditTasks', params: { taskId: 'new' } }">
        <button>Añadir Nueva Tarea</button>
      </router-link>
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
  methods: {
    toggleTaskStatus(task) {
      // Cambia el estado de la tarea localmente
      task.status = !task.status;

      // Envía una solicitud PUT al backend para actualizar el estado de la tarea
      fetch(`http://localhost:8080/api/v1/tasks/${task.taskId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName: task.taskName,
          dueDate: task.dueDate,
          status: task.status,
          completionTime: task.completionTime,
          labelId: task.label.labelId,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("Tarea actualizada con éxito.");
        })
        .catch((error) => {
          console.error("Error al actualizar la tarea:", error);
        });
    },
    logout() {
      // Realiza una solicitud al backend para cerrar sesión
      fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        // Puedes agregar cualquier encabezado necesario
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          // Redirige al usuario a la página de inicio de sesión o a donde prefieras
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    },
  },
};
</script>

<style>
.custom-radio {
  width: 20px; /* Ajusta el ancho deseado */
  height: 20px; /* Ajusta la altura deseada */
  margin-right: 10px; /* Espacio entre el radio button y el texto */
  /* Otros estilos personalizados */
}
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
