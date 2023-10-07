var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
async function cadastrar(idEmpresa, razaoSocial, nomeFantasia, cnpj, cep, endereco, numero, bairro, cidade, estado, complemento, nomeUsuario, sobrenomeUsuario, email, cargo, telefone, perguntaDeSeguranca, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao1 = `
        INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado) VALUES ('${endereco}', '${numero}', '${bairro}', '${cep}', '${complemento}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao1);
    await database.executar(instrucao1);

    var instrucao2 = `
        INSERT INTO Empresa (razaoSocial, nomeFantasia, cnpj, endereco_id) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}', '${idEmpresa}');
       
    `;
    console.log("Executando a instrução SQL: \n" + instrucao2);
    await database.executar(instrucao2);

    var instrucao3 = `
        INSERT INTO Usuario (primeiro_nome, sobrenome, ) VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao3);
    await database.executar(instrucao3);

}

module.exports = {
    autenticar,
    cadastrar
};