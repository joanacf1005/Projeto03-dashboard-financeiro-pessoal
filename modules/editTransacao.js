//popup para editar e ver transação

export function inicializarPopUp(transacoes, renderizarTransacoes, atualizarDados) {
    const popup = document.getElementById("popup-transacao");
    const popupDescricao = document.getElementById("popup-descricao");
    const popupQuantidade = document.getElementById("popup-quantidade");
    const popupCategoria = document.getElementById("popup-categoria");
    const popupTipo = document.getElementById("popup-tipo");
    const btnSalvar = document.getElementById("salvar-popup");
    const btnFechar = document.getElementById("fechar-popup");

    function abrirPopUp(transacao,index){
        popup.style.display = "flex";

            popupDescricao.value = transacao.descricao;
            popupQuantidade.value = transacao.quantidade;
            popupCategoria.value = transacao.categoria;
            popupTipo.value = transacao.tipo;

            btnSalvar.onclick = () => {
                transacoes[index].descricao = popupDescricao.value;
                transacoes[index].quantidade = Number(popupQuantidade.value);
                transacoes[index].categoria = popupCategoria.value;

                renderizarTransacoes();
                atualizarDados();

                popup.style.display = "none";
            };

            btnFechar.onclick = () => {
                popup.style.display = "none";
            };
    }
    return abrirPopUp;
}


    