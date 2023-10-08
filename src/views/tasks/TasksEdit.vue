<template>
  <div v-if="task">
    <h1>Edit Task</h1>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <label for="taskName">Task Name</label>
        <input type="text" id="taskName" v-model="task.taskName" required />
      </div>
      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input
          type="datetime-local"
          id="dueDate"
          v-model="task.dueDate"
          required
        />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
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
        <label for="labelName">Label Name</label>
        <input type="text" id="labelName" v-model="task.label.labelName" />
      </div>
      <div class="form-group">
        <label for="labelColor">Label Color</label>
        <input type="color" id="labelColor" v-model="task.label.labelColor" />
      </div>
      <button type="submit">Save</button>
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
    };
  },
  mounted() {
    this.fetchTask();
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
    updateTask() {
      // Envía la tarea actualizada al servidor (puedes implementar esto según tu API)
      console.log("Task to update:", this.task);
      // Luego puedes redirigir o realizar otras acciones después de la actualización
    },
  },
};
</script>

<style scoped>
input {
  margin: 5px;
}
</style>
