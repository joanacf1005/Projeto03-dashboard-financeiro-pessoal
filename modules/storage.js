//✔ para saber que já fiz 
// ✖ para saber que ainda falta
// OBJETIVO:
// Salvar ✖ e recuperar ✖ as transações no localStorage. 

// PENSAMENTO:

// 1) Precisamos definir uma chave fixa para armazenar os dados.✖
// 2) Quando salvar:
//    - Converter array de objetos para JSON.✖
//    - Usar localStorage.setItem().✖
// 3) Quando carregar:
//    - Buscar com localStorage.getItem().✖
//    - Se existir, converter de volta com JSON.parse().✖
//    - Se não existir, retornar array vazio.✖

// PERGUNTAS PARA VOCÊ:
// - O que acontece se não existir nada salvo?
// - Por que precisamos usar JSON.stringify?
// - O que localStorage realmente armazena?

// DICA:
// localStorage só aceita strings.

