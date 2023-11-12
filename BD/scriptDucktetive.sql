CREATE DATABASE Ducktetive;

-- Use o banco de dados Ducktetive
USE Ducktetive;

-- Tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cep CHAR(8) NOT NULL,
    complemento VARCHAR(30),
    cidade VARCHAR(40) NOT NULL,
    estado CHAR(2) NOT NULL
);

-- Tabela Empresa
CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    fkEndereco INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Pergunta de Segurança
CREATE TABLE PerguntaSeguranca (
    idPergunta INT PRIMARY KEY auto_increment,
    descricao VARCHAR(100)
);

CREATE TABLE cargo (
idCargo INT PRIMARY KEY auto_increment,
nome VARCHAR(50) NOT NULL,
nivelPermissao CHAR(3) NOT NULL
);

-- Tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    primeiro_nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(60) NOT NULL,
    telefone CHAR(11),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    resposta_seguranca VARCHAR(50),
    fkPergunta INT,
    fkCargo INT,
    fkEmpresa INT,
    FOREIGN KEY (fkPergunta) REFERENCES PerguntaSeguranca(idPergunta),
    FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Status Processo (Ativo, Pause...)
CREATE TABLE StatusProcesso (
    idStatusProcesso INT PRIMARY KEY,
    nome VARCHAR(40)
);

-- Tabela Status Servidor (Ativo, Inativo, Manutenção)
CREATE TABLE StatusServidor (
    idStatusServidor INT PRIMARY KEY,
    nome VARCHAR(40)
);

-- Tabela Unidade de Medida MB, GB, KB etc..
CREATE TABLE Prefixos (
    idPrefixos INT PRIMARY KEY,
    acronimos VARCHAR(10)
);

-- Tabela Servidor 
CREATE TABLE Servidor (
    idServidor INT PRIMARY KEY,
    nome VARCHAR(60),
    fkEmpresa INT,
    fkEndereco INT,
    fkStatusServ INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    FOREIGN KEY (fkStatusServ) REFERENCES StatusServidor(idStatusServidor)
);


-- Tabela Processo (Inovação)
CREATE TABLE Processo (
    idProcesso INT PRIMARY KEY,
    pId VARCHAR(10),
    consumoCPU DOUBLE,
    consumoMem DOUBLE,
    fkServidor INT,
    fkStatusProce INT,
    FOREIGN KEY (fkServidor) REFERENCES Servidor(idServidor),
    FOREIGN KEY (fkStatusProce) REFERENCES StatusProcesso(idStatusProcesso)
);

-- Tabela Parametos do Alertas 
CREATE TABLE ParametroAlerta (
    idParametro INT PRIMARY KEY,
    maximo DOUBLE,
    minimo DOUBLE,
    fkServidor INT,
    FOREIGN KEY (fkServidor) REFERENCES Servidor(idServidor)
);

-- Tabela Unidades de Media como USO cpu
CREATE TABLE EspecMetrica (
    idEspecMetrica INT PRIMARY KEY,
    descricao VARCHAR(40)
);

-- Tabela Componente 
CREATE TABLE Componente (
    idComponente INT PRIMARY KEY,
    nome VARCHAR(45),
    tamanho DOUBLE,
    fkEspecMetrica INT,
    fkParametro INT,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkEspecMetrica) REFERENCES EspecMetrica(idEspecMetrica),
    FOREIGN KEY (fkParametro) REFERENCES ParametroAlerta(idParametro)
);

CREATE TABLE configuracao (
idConfiguracao INT,
fkComponente INT,
fkServidor INT,
tamanhoTotal BiGINT,
FOREIGN KEY (fkComponete) REFERENCES componente(idComponente),
FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor),
PRIMARY KEY (fkComponente, fkServidor)
);

-- Tabela Metrica 
CREATE TABLE Metrica (
    idMetrica INT PRIMARY KEY,
    valor DOUBLE,
    datahora DATETIME,
    fkConfiguracao INT,
    fkServidor INT,
    fkEspecMetrica INT,
    FOREIGN KEY (fkConfiguracao) REFERENCES configuracao(idConfiguracao),
    FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor),
    FOREIGN KEY (fkEspecMetrica) REFERENCES especMetrica(idEspecMetrica)
);

-- testes 



INSERT INTO ENDERECO values
(null , "Rua Tilambuco", "12", "Jardim das Aflições", "04628700", "Bloco 3 ap 211", "Garanhuins", "PB");

INSERT INTO Empresa values
(null, "Ugah comercio de cereais LTDA", "Cerealista paraiba", "1234678100025", (last_insert_id()));

INSERT INTO PerguntaSeguranca values
(1, "Nome do seu primeiro cachorro"),
(2, "Nome de solteira da sua mãe"),
(3, "Nome da cidade que você nasceu");

INSERT INTO Usuario values
(null, "Kizma22", "Ballz", "11976856765", "kizma2@gmail.com", "123456", "admin", "bolinha", 2, last_insert_id());

INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco) VALUES 
('teste', 'teste2', '12345678912345', (SELECT COUNT(*) AS total_cadastros FROM Endereco));


select idUsuario from usuario where email = "vitor@gmail.com" and resposta_seguranca = "bolinha" and fkPergunta = 1;


UPDATE usuario JOIN
 ( SELECT idUsuario FROM usuario WHERE email = "vitor@gmail.com" AND resposta_seguranca = "bolinha" AND fkPergunta = 1 ) subquery 
 ON usuario.idUsuario = subquery.idUsuario SET usuario.senha = "alterado";


INSERT INTO Usuario (primeiro_nome, sobrenome, telefone, email, senha, cargo, resposta_seguranca, fkPergunta, fkEmpresa) VALUES
 ('Vitor', 'Ramos', '11970808325','vitor@gmail.com','123','admin','bolinha', '1', (SELECT COUNT(*) AS total_cadastros FROM Empresa));
 
INSERT INTO Usuario (primeiro_nome, sobrenome, telefone, email, senha, cargo, resposta_seguranca, fkPergunta, fkEmpresa) VALUES
 ('Vitor', 'Ramos', '11970808325','vitor@gmail.com','123','admin','bolinha', '1', (SELECT COUNT(*) AS total_cadastros FROM Empresa));

INSERT INTO Usuario (primeiro_nome, sobrenome, telefone, email, senha, cargo, resposta_seguranca, fkPergunta, fkEmpresa) VALUES 
('RAMON', 'dino', '11989016466','dino@gmail.com','123','dono','dinossauro','1', (SELECT COUNT(*) AS total_cadastros FROM Empresa));

SELECT idUsuario, primeiro_nome, email, fkEmpresa as loginUsuario
 FROM usuario 
 WHERE email = 'kizma@gmail.com' AND 
	   senha = '123456';

select * from Usuario;
select * from empresa;
select * from endereco;
select * from PerguntaSeguranca;
select * from componente;
select * from StatusServidor;
select * from Servidor;

select idUsuario,
       primeiro_nome,
       sobrenome,
       telefone,
       email,
       cargo,
       resposta_seguranca,
       razao_social,
       nome_fantasia,
       cnpj,
       logradouro,
       numero,
       bairro,
       cep,
       complemento,
       cidade,
       estado 
       from usuario join empresa on fkEmpresa = idEmpresa 
                    join endereco on fkEndereco = idEndereco 
                    where email = 'kaiky@ducktetive.com' and 
						  senha = 'alterado';
                          
                          

UPDATE usuario u join empresa emp on u.fkEmpresa = emp.idEmpresa 
				 join endereco ende on emp.fkEndereco = ende.idEndereco
 set u.primeiro_nome = 'kaiky',
     u.sobrenome = 'cruz',
     u.telefone = '11989597456',
     u.email = 'kaiky@ducktetive.com',
     u.resposta_seguranca = 'betinha',
     u.fkPergunta = 1,
     emp.razao_social = 'patos brancos',
     emp.nome_fantasia = 'Ducktetive',
     emp.cnpj = '12345678901234',
     ende.logradouro = 'Rua dos Patos',
     ende.numero = 1102,
     ende.bairro = 'Jardim dos Patos',
     ende.cep = '01234600',
     ende.complemento = 'Bloco 1 ap 2123',
     ende.cidade = 'Patolandia',
     ende.estado = 'SP'
WHERE u.idUsuario = 6;
 
 


-- INSERTS -----------------------------------------------------------------------------------------------
-- INSERTS -----------------------------------------------------------------------------------------------
-- INSERTS -----------------------------------------------------------------------------------------------
-- INSERTS -----------------------------------------------------------------------------------------------
-- INSERTS -----------------------------------------------------------------------------------------------
-- INSERTS -----------------------------------------------------------------------------------------------

INSERT INTO StatusServidor (idStatusServidor, nome) VALUES
(1, 'Ativo'),
(2, 'Inativo'),
(3, 'Manutenção');

INSERT INTO Servidor (idServidor, nome, fkEmpresa, fkEndereco, fkStatusServ) VALUES
(1, 'Servidor1', 1, 1, 1);

INSERT INTO ParametroAlerta (idParametro, maximo, minimo, fkServidor) VALUES
(1, 100.00, 10.00, 1);

INSERT INTO EspecMetrica (idEspecMetrica, descricao) VALUES
(2, 'Uso CPU');

INSERT INTO Componente (idComponente, nome, tamanho, fkEspecMetrica, fkParametro) VALUES
(1, 'CPU', null, 1, 1);
