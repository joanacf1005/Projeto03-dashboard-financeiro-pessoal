import { carregarTransacoes, salvarTransacoes } from './storage.js';

let totalReceitas = 0;
let totalDespesas = 0;

function calcularReceitas(){    
    const transacoes = carregarTransacoes();
    
    totalReceitas = transacoes.reduce((soma, transacao) => {
        if(transacao.tipo === "receita"){
            totalReceitas += transacao.quantidade
        }
        return soma;
    },0);

    console.log("Total Receitas:", totalReceitas);
    //receber as transações que o tipo = receita
    //se é receita adicionar a uma variavel que guarda a soma (soma = soma + receita)
    //devolver o valor soma total para depois meter na renda total
}

calcularReceitas()