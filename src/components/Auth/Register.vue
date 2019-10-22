<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="nome">Name</label>
      <div>
          <input id="nome" type="text" v-model="nome" required autofocus>
      </div>

      <label for="nomeuser" >E-Mail Address</label>
      <div>
          <input id="nomeuser" type="nomeuser" v-model="nomeuser" required>
      </div>

      <label for="senha">Password</label>
      <div>
          <input id="senha" type="senha" v-model="senha" required>
      </div>

      <label for="confirmasenha">Confirm Password</label>
      <div>
          <input id="confirmasenha" type="password" v-model="confirmasenha" required>
      </div>

      <div>
          <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        nome : "",
        nomeuser : "",
        senha : "",
        confirmasenha : "",
        is_admin : null
      }
    },
  }
</script>
<script>
  export default {
   
    methods: {
      register: function () {
        let data = {
          nome: this.nome,
          nomeuser: this.nomeuser,
          senha: this.senha,
          is_admin: this.is_admin
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>