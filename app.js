//✔ para saber que já fiz 
// ✖ para saber que ainda falta

import { carregarTransacoes, salvarTransacoes } from './modules/storage.js';

// 1) Capturar inputs do formulário ✔
const tipoTransacaoValue = document.getElementById("tipo-transacao");

tipoTransacaoValue.addEventListener("change", () => {
    console.log(tipoTransacaoValue.value); //ver o valor selecionado na consola
});

const categoriaBotao = document.querySelectorAll(".categorias");
const inputHidden = document.getElementById("categoria-selecionada");

let categoriaSelecionada = "";

categoriaBotao.forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaBotao.forEach(b => b.classList.remove("ativa")); // remove o valor anterior no inputhidden
        botao.classList.add("ativa"); // marca o botao como ativo
        categoriaSelecionada = botao.dataset.value; // guarda o valor
        inputHidden.value = categoriaSelecionada; // colocar no input hidden a categoria selecionada
        console.log("Categoria selecionada:", categoriaSelecionada); //ver a categoria selecionada na consola
    })
})

const listaTransacoes = document.querySelector(".lista-transacoes");

// 5) Estado principal
let transacoes = carregarTransacoes();
console.log("Transações carregadas:", transacoes);

//função para re-renderizar a lista
function renderizarTransacoes() {
    listaTransacoes.innerHTML = ""; // limpa a lista antes de renderizar

    transacoes.forEach(transacao => {
        const transacaoListItem = document.createElement("li");
        transacaoListItem.classList.add("transacao-Item");

        transacaoListItem.innerHTML =
            '<span>' + transacao.descricao + '</span>' +
            '<span>' + transacao.categoria + '</span>' +
            '<span>' + new Date(transacao.data).toLocaleDateString() + '</span>' +
            '<span>' + transacao.quantidade + '</span>';

        listaTransacoes.appendChild(transacaoListItem); //pega no <li> listaTransacoes e adiciona dentro da <ul> lista-transacoes. 
    });
}

// Renderiza transações guardadas ao iniciar
renderizarTransacoes();

//função para adicionar transação ✔
function adicionarTransacao(){
    //descrição 
    let descricaoValue = document.getElementById("descricao").value;
    //validações // 3) Validar dados. ✔
    if (descricaoValue.length < 3) {
        alert("Escreva de novo, com mínimo 3 letras!");
        return;
    } 
    if (descricaoValue == "") {
        alert("Escreva algo!");
        return;
    }

    //valor 
    let quantidadeValue = document.getElementById("quantidade").value;
    quantidadeValue = Number(quantidadeValue); // converte
    //validações // 3) Validar dados. ✔
    if(quantidadeValue <= 0 || isNaN(quantidadeValue)){
        alert("Insira um número positivo, maior que zero!");
        return;            
    }

    //tipo
    const tipoTransacaoSelecionado = tipoTransacaoValue.value;
    //validações // 3) Validar dados. ✔
    if(tipoTransacaoSelecionado == ""){
        alert("Selecione um tipo de transação!");
        return;
    }

    //categoria
    const categoriaValue = inputHidden.value;
    //validações // 3) Validar dados. ✔
    if(categoriaValue == ""){
        alert("Escolha uma categoria!");
        return;
    }

    //console.log para os inputs:
    console.log({
        descricao: descricaoValue,
        quantidade: quantidadeValue,
        tipo: tipoTransacaoSelecionado,
        categoria: categoriaValue
    });

    // 4) Criar objeto transação. ✔ 
    const transacao = {
        descricao: descricaoValue,              
        quantidade: quantidadeValue,    
        tipo: tipoTransacaoSelecionado,        
        categoria: categoriaValue,              
        data: new Date()                        
    };

    // 5) Atualizar estado ✔ 
    transacoes.push(transacao);
    console.log("Transações:", transacoes); 

    //Salvar no localStorage ✔ 
    salvarTransacoes(transacoes);

    // 6) Re-renderizar UI ✔
    renderizarTransacoes();

    // 7) Limpar formulário. ✔
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    tipoTransacaoValue.value = "";
    inputHidden.value = "";
    categoriaBotao.forEach(botao => {
        botao.classList.remove("ativa");
    });
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



