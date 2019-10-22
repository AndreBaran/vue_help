<template>
	<aside class="col-sm-4">
<p>Login form style 3</p>

<div class="card">
<article class="card-body">
	<h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
	<hr>
	<p class="text-success text-center">Some message goes here</p>
	<form>
	<div class="form-group">
	<div class="input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		 </div>
         <v-alert
             color="error"
             :value="error"
             icon="close"
            > 
            O nome do usuário ou senha estão errados
         </v-alert>
		<input name="" v-model="nomeuser" class="form-control" placeholder="Email or login" type="email">
	</div> <!-- input-group.// -->
	</div> <!-- form-group// -->
	<div class="form-group">
	<div class="input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
		 </div>
	    <input class="form-control" v-model="senha" placeholder="******" type="password">
	</div> <!-- input-group.// -->
	</div> <!-- form-group// -->
	<div class="form-group">
	<button type="submit" class="btn btn-primary btn-block"> Login  </button>
	</div> <!-- form-group// -->
	<p class="text-center"><a href="#" class="btn">Forgot senha?</a></p>
	</form>
</article>
</div> <!-- card.// -->

	</aside> <!-- col.// -->
 
<!--container end.//-->
</template>
<script>
export default {
    name: "login",
    data: () => ({
        nomeuser: '',
        senha: '',
        error: false
    }),
     methods: {
      login: function () {
        let nomeuser = this.nomeuser 
        let senha = this.senha
        this.$store.dispatch('login', { nomeuser, senha })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
   /* methods: 
    {
        login(){
            this.$store.dispatch("LOGIN",{
                _username: this.nomeuser,
                _password: this.senha,
            })
            .then(sucess =>{
              this.$router.push("/")

            })

            .catch(error =>{
                this.error = true
            })
      
        }*/
    }
}
</script>