<template>
    <div class="mt-4">
        <hr>
        <h2 class="font-weight-light">Salvar Conta</h2>
        <form @submit.prevent="salvar">
            <div class="row">
                <div :class="classeColuna">
                    <div class="form-group">
                        <label>Título</label>
                        <input 
                            type="text"
                            class="form-control" 
                            placeholder="Título da conta"
                            v-model="contaLocal.titulo">
                    </div>
                </div>
                <div class="col-sm-2" v-if="conta">
                    <div class="form-group">
                        <label>Conta concluída?</label>
                        <button 
                            type="button"
                            class="btn btn-sm d-block"
                            :class="classeBotao"
                            @click="contaLocal.concluido = !contaLocal.concluido">
                                <i class="fa fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        conta: {
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            contaLocal: Object.assign(
                {}, 
                { titulo: '', status: 0 }, 
                this.conta)
        }
    },
    computed: {
        classeBotao() {
            return this.conta && this.contaLocal.concluido
                ? 'btn-success'
                : 'btn-secondary'
        },
        classeColuna() {
            return this.conta 
                ? 'col-sm-10'
                : 'col-sm-12'
        }
    },
    watch: {
        conta(contaNova, contaAntiga) {
            this.contaLocal = Object.assign({}, this.conta)
        }
    },
    methods: {
        salvar(event) {
            const operacao = !this.conta ? 'criar' : 'editar'
            this.$emit(operacao, this.contaLocal)
            this.contaLocal = { titulo: '', status: 0 }
        }
    }
}
</script>

