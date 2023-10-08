<template>
  <div v-if="task">//Consumir api</div>
  <div v-else>
    <p>Loading task details...</p>
  </div>
</template>

<script>
export default {
  props: ["taskId"],
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    fetch("http://localhost:8080/api/v1/tasks/" + this.taskId)
      .then((res) => res.json())
      .then((data) => (this.job = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<style></style>
