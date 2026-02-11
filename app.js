//✔ para saber que já fiz 
// ✖ para saber que ainda falta
// OBJETIVO:
// Conectar tudo.

// PASSO A PASSO:

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
            
        categoriaBotao.forEach(b => b.classList.remove("ativa"));// remove o valor anterior no inputhidden

        botao.classList.add("ativa"); //marca o botao como ativo, a classe vai ficar class = "categorias ativa" para depois mudar o css

        categoriaSelecionada = botao.dataset.value;// guarda o valor

        inputHidden.value = categoriaSelecionada; // colocar no input hidden a categoria selecionada

        console.log("Categoria selecionada:", categoriaSelecionada); //ver a categoria selecionada na consola

    })
})

const listaTransacoes = document.querySelector(".lista-transacoes");

//função para adicionar transação ✔
function adicionarTransacao(){
    //descrição 
    const descricaoValue = document.getElementById("descricao").value;
    //valor 
    const quantidadeValue = document.getElementById("quantidade").value;
    //tipo
    const tipoTransacao = document.getElementById("tipo-transacao");
    const tipoTransacaoSelecionado = tipoTransacaoValue.value;

    //categoria
    const categoriaValue = inputHidden.value;
    //console.log para os inputs:
    console.log({
        descricao: descricaoValue,
        quantidade: quantidadeValue,
        tipo: tipoTransacaoSelecionado,
        categoria: categoriaValue
    });
    
    //criar lista de transações
    const transacaoListItem = document.createElement("li");
    transacaoListItem.classList.add("transacao-Item");

    // preencher o conteúdo do transacaoListItem
    transacaoListItem.innerHTML =
        '<span>' + descricaoValue + '</span>' +
        '<span>' + categoriaValue + '</span>' +
        '<span>' + new Date().toLocaleDateString() + '</span>' +
        '<span>' + quantidadeValue + '</span>';
    
    //adicionar transação à lista de transações
    listaTransacoes.appendChild(transacaoListItem);

    // 7) Limpar formulário. ✔
    //limpar inputs depois de adicionar
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    tipoTransacao.value = "";
    inputHidden.value = "";
    categoriaBotao.forEach(botao => {
        botao.classList.remove("ativa");
    });

}

// 2) Escutar clique do botão ✔
const adicionaHistoria = document.querySelector(".adiciona-historia")

adicionaHistoria.addEventListener("click", () =>{
    adicionarTransacao();
})


// 3) Validar dados. ✖
// 4) Criar objeto transação. ✖
// 5) Atualizar estado. ✖
// 6) Re-renderizar UI. ✖
// 7) Limpar formulário. ✔

// IMPORTANTE:
// Sempre que adicionar uma transação:
// - Atualizar lista 
// - Atualizar cards

// Pergunta:
// O que deve acontecer quando a página recarrega?
// */

