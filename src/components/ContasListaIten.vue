<template>
    <li class="d-flex mb-3">
        
        <div class="card" style="width: 16rem;">
 
  <div class="card-body">
    <h5 class="card-title mb-5">{{ conta.titulo }}</h5>
    <p class="card-text">
        
 
        <span class="espacar"></span>
         <button 
            class="btn btn-primary btn-sm mr-1" 
            title="A fazer"
            :class="classeCSSAFazerConta" 
            @click="aFazerConta">
                <i class="fa fa-clock"></i>
        </button>
        <button 
            class="btn btn-primary btn-sm mr-1" 
            title="Fazendo"
            :class="classeCSSAFazendoConta" 
            @click="fazendoConta">
                <i class="fa fa-sun"></i>
        </button>
        <button 
            class="btn btn-sm mr-1" 
            :class="classeCSSConcluidaConta" 
            :title="tituloBotaoConcluido"
            @click="concluirConta">
                <i class="fa fa-check"></i>
        </button>
        <button 
            class="btn btn-primary btn-sm mr-1" 
            title="Editar"
            @click="$emit('editar', conta)">
                <i class="fa fa-pencil-alt"></i>
        </button>
        <button 
            class="btn btn-danger btn-sm" 
            title="Deletar"
            @click="$emit('deletar', conta)">
                <i class="fa fa-trash"></i>
        </button>

    </p>
   
  </div>
</div>
    </li>
</template>

<script>
export default {
    props: {
        conta: {
            type: Object,
            required: true
        }
    },
    computed: {
        classeCSSConcluidaConta() {
            return {
                'btn-secondary': this.conta.status==2,
                'btn-success': !this.conta.status==2
            }
        },
        classeCSSAFazerConta() {
            return {
                'btn-secondary': this.conta.status==0,
                'btn-success': !this.conta.status==0
            }
        },
        classeCSSAFazendoConta() {
            return {
                'btn-secondary': this.conta.status==1,
                'btn-success': !this.conta.status==1
            }
        },
        tituloBotaoConcluido() {
            return this.conta.status==2
                ? 'Refazer Conta'
                : 'Concluir Conta'
        }
    },
    methods: {
        aFazerConta() {
            this.$emit('concluir', Object.assign({}, this.conta, { status: 0 }))
        },
        fazendoConta() {
            this.$emit('concluir', Object.assign({}, this.conta, { status: 1 }))
        },
        concluirConta() {
            this.$emit('concluir', Object.assign({}, this.conta, { status: 2 }))
        }
    }
}
</script>

<style scoped>

    .espacar {
        flex: 1 1 auto;
    }

</style>
