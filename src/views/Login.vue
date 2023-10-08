<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h2>Iniciar Sesión</h2>
      <div class="form-group">
        <label for="user">Usuario</label>
        <input
          type="text"
          id="user"
          v-model="loginData.user"
          placeholder="Usuario"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="loginData.password_hash"
          placeholder="Contraseña"
          required
        />
      </div>

      <button type="submit" class="login-button">Iniciar Sesión</button>
      <div v-if="error" class="modal">
        <div class="modal-content">
          <span class="close" @click="error = null">&times;</span>
          <p>{{ error }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        user: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    login() {
      fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Redireccionar después del inicio de sesión (si es exitoso)
          this.$router.push("/Tasks");
          // Mostrar mensaje de éxito (puedes personalizar según tu respuesta del servidor)
          console.log(data);
        })
        .catch((error) => {
          // Mostrar mensaje de error en el modal
          this.error = "Error al iniciar sesión. Verifica tus credenciales.";
          console.error("Error al iniciar sesión:", error);
        });
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4; /* Color de fondo */
}

form {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #35495e; /* Color de texto */
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #35495e; /* Color de texto */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #42b983; /* Color del botón */
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #35977d; /* Color del botón al pasar el mouse */
}
</style>
