import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        user: User
    },
    
    state: {
        contador: 12,
        contas: []
    },
    mutations:{
        /*
       listarContas: state =>{
           state.contas =  [
            {
                "titulo": "Testes",
                "concluido": false,
                "status": 1,
                "curso": "Vue JS",
                "id": 7
              }
            ]
       }
       */
       listarContas: (state, payload)=>{
        state.contas = payload
        /*state.contas =  [
            {
                "titulo": "Título 1",
                "concluido": false,
                "status": 0,
                "curso": "Curso 1",
                "id": 1
              }
            ]*/
        }
        
        
    },
    getters:{
        contasConcluidas: (state)=>{
            return state.contas.filter(t => t.status==2)
        },
        contasFazendo: (state)=>{
            return state.contas.filter(t => t.status==1)
        },
        contasAFazer: (state)=>{
            return state.contas.filter(t => t.status==0)
        },
        totalContasConcluidas: (state,getters)=>{
            return getters.contasConcluidas.lenght
        }
        //sintaxe alternativa para um parâmetro
        //contasConcluidas: state=>state.contas.filter(t => t.concluido)
        
    }
})