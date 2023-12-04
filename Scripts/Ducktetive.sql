CREATE DATABASE Ducktetive;

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


-- Tabela Processo
CREATE TABLE Processo (
    idProcesso INT PRIMARY KEY AUTO_INCREMENT,
    pId VARCHAR(10),
    nome VARCHAR(40),	
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
    cpuLogica INT,
    cpuFisica INT,
    nomeRede VARCHAR (255),
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
