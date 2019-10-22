<template>
<div>	
  
  <div class="container" style="margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;">
<div>	  
<nav class="navbar bg-light bg-dark navbar-dark" id="teste">
   <ul class="navbar-nav">
    <li class="nav-item">
      <router-link class="nav-link" to="contasLista"><i class="fa fa-home fa-fw"></i>Contas a pagar</router-link>  
          
    </li><hr class="linha">
    <li class="nav-item">
       <a class="nav-link" href="https://drive.google.com/file/d/1AkIu1u7A5Xvqh9QKrFPkZ7ilz8ILkJwO/view?usp=sharing"><i class="fa fa-book fa-fw" aria-hidden="true"></i>Sistemas Similares</a>
    </li><hr class="linha">
    <li class="nav-item">
       <router-link class="nav-link" to="login"><i class="fa fa-home fa-fw"></i>login</router-link>  
    </li>
  </ul>   
  </nav>
  </div>
   </div>


  <div>
   <router-view/>
   </div>
 

  </div>
</template>

<script>





</script>
<style src="./assets/custom.css" lang="css"></style>