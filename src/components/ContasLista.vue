<template>
    <div>
            <br>
        <div class="row">
             <div class="col-sm-10">
                <h1 class="font-weight">Lista de Contas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-default float-right"
                    @click="exibirFormularioCriarConta">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
                
                

            </div>
         <div id="example-3">
  <button class="btn btn-default float-right" v-on:click="say('Utilize o botão CRIAR para inserir novas contas. Caso precise fazer alterações utilize os ícones abaixo da conta criada')"><i class="fa fa-exclamation-circle" 
  aria-hidden="true">
      </i>Informações</button>

</div>
        </div>
        <hr>


  <div class="row">
    <div class="col-md-auto">
      <h5 class="text-default mb-3">A FAZER</h5><hr>
        <ul class="list-group mb-4" v-if="contasOrdenadas.length > 0">
            <ContasListaIten
                v-for="conta in contasAFazer" 
                :key="conta.id"
                :conta="conta"
                @editar="selecionarContaParaEdicao"
                @deletar="deletarConta"
                @concluir="editarConta" />
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma conta criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>
    </div>
    <div class="col-md-auto">
      <h5 class="text-default mb-3">LANÇAMENTOS FUTUROS</h5><hr>
      <ul class="list-group mb-4" v-if="contasOrdenadas.length > 0">
            <ContasListaIten
                v-for="conta in fazendoContas" 
                :key="conta.id"
                :conta="conta"
                @editar="selecionarContaParaEdicao"
                @deletar="deletarConta"
                @concluir="editarConta" />
        </ul>
         <p v-else-if="!mensagemErro">Nenhuma conta criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>
    </div>
    <div class="col-md-auto">
        <h5 class="text-default mb-3">CONCLUÍDO</h5><hr>
        <ul class="list-group mb-4" v-if="contasOrdenadas.length > 0">
            <ContasListaIten
                v-for="conta in contasConcluidas" 
                :key="conta.id"
                :conta="conta"
                @editar="selecionarContaParaEdicao"
                @deletar="deletarConta"
                @concluir="editarConta" />
        </ul>
         <p v-else-if="!mensagemErro">Nenhuma conta criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>
    </div>
  </div>

        <ContaSalvar
            v-if="exibirFormulario"
            :conta="contaSelecionada"
            @criar="criarConta"
            @editar="editarConta" />

    </div>
</template>

<script>

import axios from './../axios'

import ContaSalvar from './ContaSalvar.vue'
import ContasListaIten from './ContasListaIten.vue'



export default {
    name: 'home',
    components: {
        ContaSalvar,
        ContasListaIten
    },
    data() {
        return {
            contas: [],
            exibirFormulario: false,
            contaSelecionada: undefined,
            mensagemErro: undefined,
            titulo: ''
        }
    },
    computed: {
        contasOrdenadas() {
            return this.$store.state.contas.sort((t1, t2) => {
                if (t1.concluido === t2.concluido) {
                    return t1.titulo < t2.titulo
                        ? -1
                        : t1.titulo > t2.titulo
                            ? 1
                            : 0
                }
                return t1.concluido - t2.concluido
            })
        },
        contasConcluidas(){
            return this.$store.getters.contasConcluidas
        },
        contasAFazer(){
            return this.$store.getters.contasAFazer
        },
        fazendoContas(){
            return this.$store.getters.contasFazendo
        },
    },
    created() {
        axios.get(`/contas`)
            .then((response) => {
                console.log('GET /contas', response)
                this.contas = response.data
                this.$store.commit('listarContas', response.data)
                return 'Axios'
            }, error => {
                console.log('Erro capturado no then: ', error)
                return Promise.reject(error)
            }).catch(error => {
                console.log('Erro capturado no catch: ', error)
                if (error.response) {
                    this.mensagemErro = `Servidor retornou um erro: ${error.message} ${error.response.statusText}`
                    console.log('Erro [resposta]: ', error.response)
                } else if (error.request) {
                    this.mensagemErro = `Erro ao tentar comunicar com o servidor: ${error.message}`
                    console.log('Erro [requisição]: ', error.request)
                } else {
                    this.mensagemErro = `Erro ao fazer requisição ao servidor: ${error.message}`
                }
                return 'Curso VueJS'
            }).then((algumParametro) => {
                console.log('Sempre executado!', algumParametro)
            })
    },
    methods: {
        criarConta(conta) {
            console.log(conta)
            axios.post(`/contas`, conta)
                .then((response) => {
                    console.log('POST /contas', response)
                    this.contas.push(response.data)
                    this.resetar()
                })
        },
        say: function (message) {
      alert(message)
        },
        
        async deletarConta(conta) {
            const confirmar = window.confirm(`Deseja deletar a conta "${conta.titulo}"?`)
            if (confirmar) {

                axios.delete(`/contas/${conta.id}`)
                    .then(response => {
                        console.log(`DELETE /contas/${conta.id}`, response)
                        const indice = this.contas.findIndex(t => t.id === conta.id)
                        this.contas.splice(indice, 1)
                    })
            }
        },
        editarConta(conta) {
            console.log('Editar: ', conta)
            axios.put(`/contas/${conta.id}`, conta)
                .then(response => {
                    console.log(`PUT /contas/${conta.id}`, response)
                    const indice = this.contas.findIndex(t => t.id === conta.id)
                    this.contas.splice(indice, 1, conta)
                    this.resetar()
                })
        },
        exibirFormularioCriarConta(event) {
            if (this.contaSelecionada) {
                this.contaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        resetar() {
            this.contaSelecionada = undefined
            this.exibirFormulario = false
        },
        selecionarContaParaEdicao(conta) {
            this.contaSelecionada = conta
            this.exibirFormulario = true
        },
      
    }
}

</script>
