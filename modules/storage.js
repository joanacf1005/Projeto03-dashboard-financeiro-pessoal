//✔ para saber que já fiz 
// ✖ para saber que ainda falta
// OBJETIVO:
// Salvar e recuperar as transações no localStorage. ✔ 

// Salvar transações no localStorage ✔ 
export function salvarTransacoes(transacoes) { //Cria uma função exportada que recebe o array transacoes
    localStorage.setItem("transacoes", JSON.stringify(transacoes)); //guarda na key transacoes e converte o array para string
}

//Carregar transações do localStorage  ✔ 
export function carregarTransacoes() { //Cria uma função exportada vai carregar os dados guardados no array transacoes
    const data = localStorage.getItem("transacoes"); //Vai buscar ao localStorage o que está guardado na key transacoes
    return data ? JSON.parse(data) : []; // devolve o JSON se existir, senão devolve vazio
}


// PENSAMENTO:

// 1) Precisamos definir uma chave fixa para armazenar os dados.✖
// 2) Quando salvar:
//    - Converter array de objetos para JSON.✔
//    - Usar localStorage.setItem().✔
// 3) Quando carregar:
//    - Buscar com localStorage.getItem().✔
//    - Se existir, converter de volta com JSON.parse().✔
//    - Se não existir, retornar array vazio.✔

// PERGUNTAS PARA VOCÊ:
// - O que acontece se não existir nada salvo?
// - Por que precisamos usar JSON.stringify?
// - O que localStorage realmente armazena?

// DICA:
// localStorage só aceita strings.

