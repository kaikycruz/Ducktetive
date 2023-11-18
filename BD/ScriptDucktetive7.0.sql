CREATE DATABASE Ducktetive;

drop DATABASE Ducktetive;

USE Ducktetive; 

-- Tabela Pergunta de Segurança
CREATE TABLE PerguntaSeguranca (
    idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100)
);

-- Tabela cargo
CREATE TABLE cargo (
    idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    nivelPermissao CHAR(3) NOT NULL
);

-- Tabela Status Processo
CREATE TABLE StatusProcesso (
    idStatusProcesso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40)
);

-- Tabela AcaoProcesso
CREATE TABLE AcaoProcesso (
    idAcaoProcesso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55)
);

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

-- Tabela Status Servidor
CREATE TABLE StatusServidor (
    idStatusServidor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40)
);

-- Tabela Servidor
CREATE TABLE Servidor (		
    idServidor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    fkEmpresa INT,
    fkEndereco INT,
    fkStatusServ INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    FOREIGN KEY (fkStatusServ) REFERENCES StatusServidor(idStatusServidor)
);

-- Tabela Unidades de Media como USO cpu
CREATE TABLE EspecMetrica (
    idEspecMetrica INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40)
);

-- Tabela AcaoProcesso
CREATE TABLE AcaoProcesso (
    idAcaoProcesso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55)
);

-- Tabela Processo
CREATE TABLE Processo (
    idProcesso INT PRIMARY KEY AUTO_INCREMENT,
    pId VARCHAR(10),
    consumoCPU DOUBLE,
    consumoMem DOUBLE,
    fkServidor INT,
    fkStatusProce INT,
    fkAcaoProcesso INT,
    FOREIGN KEY (fkServidor) REFERENCES Servidor(idServidor),
    FOREIGN KEY (fkStatusProce) REFERENCES StatusProcesso(idStatusProcesso),
    FOREIGN KEY (fkAcaoProcesso) REFERENCES AcaoProcesso(idAcaoProcesso)
);

-- Tabela Unidade de Medida MB, GB, KB etc..
CREATE TABLE Prefixos (
    idPrefixos INT PRIMARY KEY AUTO_INCREMENT,
    acronimos VARCHAR(10)
);

-- Tabela Componente
CREATE TABLE Componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    fkPrefixo INT,
    FOREIGN KEY (fkPrefixo) REFERENCES Prefixos(idPrefixos)
);

-- Tabela Configuracao
CREATE TABLE Configuracao (
    fkComponente INT,
    fkServidor INT,
    tamanhoTotal BIGINT,
    serialDisco VARCHAR(255),
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    FOREIGN KEY (fkServidor) REFERENCES Servidor(idServidor),
    PRIMARY KEY (fkComponente, fkServidor)
);

-- Tabela Metrica
CREATE TABLE Metrica (
    idMetrica INT PRIMARY KEY AUTO_INCREMENT,
    valor DOUBLE,
    datahora DATETIME,
    fkConfigComponente INT,
    fkConfigServidor INT,
    fkEspecMetrica INT,
    FOREIGN KEY (fkConfigServidor) REFERENCES Configuracao(fkServidor),
    FOREIGN KEY (fkConfigComponente) REFERENCES Configuracao(fkComponente),
    FOREIGN KEY (fkEspecMetrica) REFERENCES EspecMetrica(idEspecMetrica)
);

-- Tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(60) NOT NULL,
    telefone CHAR(11),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(256) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    resposta_seguranca VARCHAR(50),
    fkPergunta INT,
    fkCargo INT,
    fkEmpresa INT,
    FOREIGN KEY (fkPergunta) REFERENCES PerguntaSeguranca(idPergunta),
    FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela ParametroAlerta
CREATE TABLE ParametroAlerta (
    idParametro INT PRIMARY KEY,
    maximo DOUBLE,
    minimo DOUBLE,
    fkServidor INT,
    fkComponente INT,
    FOREIGN KEY (fkServidor) REFERENCES Servidor(idServidor),
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

SHOW TABLES;

-- Inserir dados na tabela PerguntaSeguranca
INSERT INTO PerguntaSeguranca (descricao)
VALUES 
('Qual é o nome do seu animal de estimação?'),
('Nome de solteira da sua mãe?'),
('Nome da cidade que você nasceu?');

-- Inserir dados na tabela cargo
INSERT INTO cargo (nome, nivelPermissao)
VALUES 
('Dono', '777'),
('Analista', '444'),
('Estagiario', '111');

-- Inserir dados na tabela Status Processo
INSERT INTO StatusProcesso (nome)
VALUES ('Ativo'), ('Inativo'), ('Manutenção');

-- Inserir dados na tabela AcaoProcesso
INSERT INTO AcaoProcesso (nome)
VALUES ('Matar'), ('Congelar'), ('Manter');

-- Inserir dados na tabela Endereco
INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado)
VALUES 
('Rua Exemplo', 123, 'Bairro Teste', '12345678', 'Complemento Teste', 'Cidade Teste', 'SP'),
('Rua Doutor Francisco da Silva Prado', 421, 'Bairro Vila Flórida', '09661010', 'Sem complemento', 'São Bernardo do Campo', 'SP');

-- Inserir dados na tabela Empresa
INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, fkEndereco)
VALUES 
('Empresa Teste', 'Fantasia Teste', '12345678901234', 1),
('Tector compra e venda de máquinas', 'TecTor', '01234567890123', 2);

-- Inserir dados na tabela Status Servidor
INSERT INTO StatusServidor (nome)
VALUES ('Ativo'), ('Inativo'), ('Manutenção');

-- Inserir dados na tabela Servidor
INSERT INTO Servidor (nome, fkEmpresa, fkEndereco, fkStatusServ)
VALUES 
('Servidor Teste', 1, 1, 1),
('Servidor Teste', 1, 1, 1),
('Servidor Teste', 1, 1, 2),
('Servidor Teste', 1, 1, 2),
('Servidor Teste', 1, 1, 3),
('Servidor Teste', 1, 1, 3),
('Servidor Teste', 2, 2, 1),
('Servidor Teste', 2, 2, 1),
('Servidor Teste', 2, 2, 2),
('Servidor Teste', 2, 2, 2),
('Servidor Teste', 2, 2, 3),
('Servidor Teste', 2, 2, 3);

-- Inserir dados na tabela Unidades de Media como USO cpu
INSERT INTO EspecMetrica (nome)
VALUES ('Uso Ram'),
('Uso Memória'), 
('Qtd Pacotes'),
('Uso CPU');


-- Inserir dados na tabela Processo
INSERT INTO Processo (pId, consumoCPU, consumoMem, fkServidor, fkStatusProce, fkAcaoProcesso)
VALUES ('P123', 20.5, 1024.5, 1, 1, 1),
('P99', 40.2, 5225.7, 7, 1, 1);

-- Inserir dados na tabela Prefixos
INSERT INTO Prefixos (acronimos)
VALUES ('MB'), ('GB'), ('KB'), ('MHZ');

-- Inserir dados na tabela Componente
INSERT INTO Componente (nome, fkPrefixo)
VALUES
 ('CPU', 4),
('RAM', 2),
('DISCO', 1),
('REDE', 1);

-- Inserir dados na tabela Configuracao
INSERT INTO Configuracao (fkComponente, fkServidor, tamanhoTotal, serialDisco)
VALUES (1, 1, 16, 'ahcdjvadk'),
(1, 6, 16, 'okmjubgcy');

-- Inserir dados na tabela Metrica
INSERT INTO Metrica (valor, datahora, fkConfigComponente, fkConfigServidor, fkEspecMetrica)
VALUES (70.2, '2023-01-01 12:00:00', 1, 1, 4),
(1024.0, '2023-01-01 12:01:00', 1, 1, 2),
(512.0, '2023-01-01 12:02:00', 1, 1, 3),
(250, '2023-01-01 12:03:00', 1, 1, 3);

-- Inserir dados na tabela Usuario
INSERT INTO Usuario (nome, sobrenome, telefone, email, senha, resposta_seguranca, fkPergunta, fkCargo, fkEmpresa)
VALUES 
('João', 'Silva', '12345678901', 'joao@teste.com', 'senha123', 'Totó', 1, 1, 1),
('Junior', 'Pereira', '88859635744', 'pereirajr@hotmail.com', 'juninhopere414121', 'Novaes', 2, 2, 1),
('Kleber', 'Nascimento', '10515561855', 'kleber@email.com', '99199abba12', 'Jundiaí', 3, 1, 2),
('Ryan', 'Gosling', '61522247533', 'driveryan@outlook.com', '159753ap00bb', 'São Paulo', 3, 2, 2);

-- Inserir dados na tabela ParametroAlerta
INSERT INTO ParametroAlerta (idParametro, maximo, minimo, fkServidor, fkComponente)
VALUES 
(1, 50.0, 0.0, 1,1),	
(2, 65.0, 0.0, 2,2),
(3, 150.0, 0.0, 3,3),
(4, 18.0, 0.0, 4,4),
(5, 50.0, 0.0, 1,1),
(6, 65.0, 0.0, 2,2),
(7, 150.0, 0.0, 3,3),
(8, 18.0, 0.0, 4,4),
(9, 50.0, 0.0, 1,1),
(10, 65.0, 0.0, 2,2),
(11, 150.0, 0.0	, 3,3),
(12, 18.0, 0.0, 4,4);
