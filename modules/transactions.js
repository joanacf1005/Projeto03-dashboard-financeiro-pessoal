import { carregarTransacoes } from './storage.js';

let totalReceitas = 0;
let totalDespesas = 0;

//receitas

function calcularReceitas() {    
    const transacoes = carregarTransacoes();
    
    const todasTransacoes = transacoes;

    const apenasReceitas = todasTransacoes.filter(transacao => {
        return transacao.tipo === "receita";
    });

    let somaReceitas = 0;
    apenasReceitas.forEach(transacao => {
        somaReceitas += transacao.quantidade; 
    });

    totalReceitas = somaReceitas;

    console.log("Total de Receitas:", totalReceitas);
    
}

function mostrarReceitas() {
    const receitaDiv = document.querySelector(".receita-valor");
    receitaDiv.textContent = "+ " + totalReceitas.toFixed(2) + " €";
}

//despesas

function calcularDespesas(){
    const transacoes = carregarTransacoes();
    
    const todasTransacoes = transacoes;

    const apenasDespesas = todasTransacoes.filter(transacao => {
        return transacao.tipo === "despesa"; //receber as transações que o tipo = despesa
    });

    let somaDespesas = 0; //guarda a soma das despesas
    apenasDespesas.forEach(transacao => {
        somaDespesas += transacao.quantidade; 
    });

    totalDespesas = somaDespesas;

    console.log("Total de Despesas:", totalDespesas);

    
}

function mostrarDespesas() {
    const despesaDiv = document.querySelector(".despesas-valor");
    despesaDiv.textContent = "- " + totalDespesas.toFixed(2) + " €";
}

//saldo total

function calcularSaldoTotal(){
    const transacoes = carregarTransacoes();

    const saldo = transacoes.reduce((acumulador, transacao) => { //o reduce percorre o array inteiro e só devolve um unico valor final
        //por cada valor do array verifica se é receita ou despesa e devolve o valor de acordo
        if (transacao.tipo === "receita") {
            return acumulador + transacao.quantidade; //- Se for receita, soma.✔
        }

        if (transacao.tipo === "despesa") {
            return acumulador - transacao.quantidade;//- Se for despesa, subtrai.✔
        }

        return acumulador; 

    }, 0); 

    console.log("Saldo Total:", saldo);
    return saldo;
}

function mostrarSaldoTotal(){
    const saldo = calcularSaldoTotal();
    const balancoDiv = document.querySelector(".balanco-total");
    balancoDiv.textContent = saldo.toFixed(2) + " €";
}

export { calcularReceitas, calcularDespesas, calcularSaldoTotal, mostrarReceitas, mostrarDespesas, mostrarSaldoTotal };


// PENSAMENTO:

// 1) O saldo começa em 0.✔
// 2) Para cada transação:
//    - Se for receita, soma.✔
//    - Se for despesa, subtrai.✔
// 3) Para calcular totais separados:
//    - Filtrar por tipo.✔
//    - Somar valores.✔

// DICA IMPORTANTE:
// Use reduce().✔

// Pergunta:
// - O que é o acumulador?
// - Qual deve ser o valor inicial?

// Exemplo mental:
// [100, -50, 200]
// Resultado esperado: 250

// Não escreva loops tradicionais.
// 
