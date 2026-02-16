//✔ para saber que já fiz 
// ✖ para saber que ainda falta

import { carregarTransacoes, salvarTransacoes } from './modules/storage.js';
import { calcularReceitas, calcularDespesas, calcularSaldoTotal, mostrarReceitas, mostrarDespesas, mostrarSaldoTotal } from './modules/transactions.js';
import { inicializarPopUp } from './modules/editTransacao.js';

// 1) Capturar inputs do formulário ✔
const tipoTransacaoValue = document.getElementById("tipo-transacao");

tipoTransacaoValue.addEventListener("change", () => {
    console.log(tipoTransacaoValue.value);
});

const categoriaBotao = document.querySelectorAll(".categorias");
const inputHidden = document.getElementById("categoria-selecionada");

let categoriaSelecionada = "";

categoriaBotao.forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaBotao.forEach(b => b.classList.remove("ativa"));
        botao.classList.add("ativa");
        categoriaSelecionada = botao.dataset.value;
        inputHidden.value = categoriaSelecionada;
        console.log("Categoria selecionada:", categoriaSelecionada);
    })
})

const listaTransacoes = document.querySelector(".lista-transacoes");

// 5) Estado principal
let transacoes = carregarTransacoes();
console.log("Transações carregadas:", transacoes);

const abrirPopUp = inicializarPopUp(
    transacoes,
    renderizarTransacoes,
    atualizarDados
);

//função para re-renderizar a lista com botão para apagar
function renderizarTransacoes() {
    listaTransacoes.innerHTML = "";

    transacoes.forEach((transacao, index) => {

        const transacaoListItem = document.createElement("li");
        transacaoListItem.classList.add("transacao-Item");

        transacaoListItem.innerHTML =
            '<span>' + transacao.descricao + '</span>' +
            '<span>' + transacao.categoria + '</span>' +
            '<span>' + new Date(transacao.data).toLocaleDateString() + '</span>' +
            '<span>' + transacao.quantidade + " €" + '</span>';

        const botaoApagar = document.createElement("button");
        botaoApagar.textContent = "x";
        botaoApagar.classList.add("botao-apagar");

    
        botaoApagar.addEventListener("click", (event) => {
            event.stopPropagation(); 

            transacoes.splice(index, 1);
            salvarTransacoes(transacoes);
            atualizarDados();
        });

        transacaoListItem.addEventListener("click", () => {
            abrirPopUp(transacao, index);
            console.log("pop-up abrir")
        });

        transacaoListItem.appendChild(botaoApagar);
        listaTransacoes.appendChild(transacaoListItem);
    });
}


// Renderiza transações guardadas ao iniciar
renderizarTransacoes();

//função para adicionar transação ✔
function adicionarTransacao(){
    let descricaoValue = document.getElementById("descricao").value;

    if (descricaoValue.length < 3) {
        alert("Escreva de novo, com mínimo 3 letras!");
        return;
    } 
    if (descricaoValue == "") {
        alert("Escreva algo!");
        return;
    }

    let quantidadeValue = document.getElementById("quantidade").value;
    quantidadeValue = Number(quantidadeValue);

    if(quantidadeValue <= 0 || isNaN(quantidadeValue)){
        alert("Insira um número positivo, maior que zero!");
        return;            
    }

    const tipoTransacaoSelecionado = tipoTransacaoValue.value;

    if(tipoTransacaoSelecionado == ""){
        alert("Selecione um tipo de transação!");
        return;
    }

    const categoriaValue = inputHidden.value;

    if(categoriaValue == ""){
        alert("Escolha uma categoria!");
        return;
    }

    if (tipoTransacaoSelecionado === "receita") {
        const categoriasPermitidas = ["Salário", "Outros"];
        if (!categoriasPermitidas.includes(categoriaValue)) {
            alert("Para uma receita, apenas 'Salário' ou 'Outros' são permitidos como categoria!");
            return; 
        }
    }

    if (tipoTransacaoSelecionado === "despesa") {
        const categoriasPermitidas = ["Entretenimento", "Comida", "Faturas", "Lazer", "Outros"];
        if (!categoriasPermitidas.includes(categoriaValue)){
            alert("Para uma despesa, apenas 'Entretenimento', 'Comida', 'Faturas', 'Lazer' ou 'Outros' são permitidos como categoria!");
            return;
        }
    }

    console.log({
        descricao: descricaoValue,
        quantidade: quantidadeValue,
        tipo: tipoTransacaoSelecionado,
        categoria: categoriaValue
    });

    const transacao = {
        descricao: descricaoValue,              
        quantidade: quantidadeValue,    
        tipo: tipoTransacaoSelecionado,        
        categoria: categoriaValue,              
        data: new Date()                        
    };

    transacoes.push(transacao);
    console.log("Transações:", transacoes); 

    salvarTransacoes(transacoes);
    renderizarTransacoes();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    tipoTransacaoValue.value = "";
    inputHidden.value = "";
    categoriaBotao.forEach(botao => {
        botao.classList.remove("ativa");
    });

    atualizarDados();
}

// 2) Escutar clique do botão ✔
const adicionaHistoria = document.querySelector(".adiciona-historia");
adicionaHistoria.addEventListener("click", () =>{
    adicionarTransacao();
});

const adicionaTransacaoIcon = document.querySelector(".nova-transacao-icon");
adicionaTransacaoIcon.addEventListener("click", () => {
    adicionarTransacao();
});

//função que mostra e atualiza o saldo total, o total de receitas e o total de despesas

function atualizarDados(){
    renderizarTransacoes();

    calcularReceitas();
    calcularDespesas();
    calcularSaldoTotal();

    mostrarReceitas();
    mostrarDespesas();
    mostrarSaldoTotal();
}

atualizarDados();

//menu hamburger

const hamburger = document.getElementById("hamburger");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

function toggleMenu() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function fecharMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", fecharMenu); //fecha ao clicar no overlay (fora do sidebar)

// Fecha ao clicar num item do menu
document.querySelectorAll(".menu-itens").forEach(item => {
    item.addEventListener("click", fecharMenu);
});
