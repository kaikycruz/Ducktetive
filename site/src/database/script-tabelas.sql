CREATE DATABASE Ducktetive;

-- Use o banco de dados Ducktetive
USE Ducktetive;


-- Tabela Endereco
CREATE TABLE Endereco (
    endereco_id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL,
    complemento VARCHAR(255),
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL
);

-- Tabela Empresa
CREATE TABLE Empresa (
    empresa_id INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    endereco_id INT,
    FOREIGN KEY (endereco_id) REFERENCES Endereco(endereco_id)
);

-- Tabela Usuario
CREATE TABLE Usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    primeiro_nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50),
    pergunta_seguranca VARCHAR(255),
    empresa_id INT,
    FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id)
);

show tables;

create table componente (
idComponente int primary key auto_increment,
nome varchar(45)
);

create table metrica (
idMetrica int primary key auto_increment,
valor double,
dataHora datetime,
tipo varchar(45),
pId int,
fkComponenteMetrica int,
 foreign key (fkComponenteMetrica) references componente(idComponente)
);

create table parametro (
idParametro int primary key auto_increment,
fkComponenteParametro int,
maximo double,
minimo double,
foreign key (fkComponenteParametro) references componente(idComponente)
);

create table servidor (
idServidor int primary key auto_increment,
status varchar(45),
nome varchar(45),
fkEmpresa int,
fkEndereco int,
fkParametro int,
foreign key (fkEmpresa) references empresa(empresa_id),
foreign key (fkEndereco) references endereco(endereco_id),
foreign key (fkParametro) references parametro(idParametro)
);


CREATE TABLE servidor_componente (
    fkServidor INT,
    fkComponente INT,
    PRIMARY KEY (fkServidor, fkComponente),
    FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor),
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

-- Inserindo dados na tabela Endereco
INSERT INTO Endereco (logradouro, numero, bairro, cep, complemento, cidade, estado)
VALUES ('Rua A', '123', 'Bairro A', '12345678', 'Complemento A', 'Cidade A', 'SP'),
       ('Rua B', '456', 'Bairro B', '23456789', 'Complemento B', 'Cidade B', 'RJ');

-- Inserindo dados na tabela Empresa
INSERT INTO Empresa (razao_social, nome_fantasia, cnpj, endereco_id)
VALUES ('Empresa A', 'Empresa A Fantasia', '12345678901234', 1),
       ('Empresa B', 'Empresa B Fantasia', '56789012345678', 2);

-- Inserindo dados na tabela Usuario
INSERT INTO Usuario (primeiro_nome, sobrenome, telefone, email, senha, cargo, pergunta_seguranca, empresa_id)
VALUES ('Alice', 'Silva', '123456789', 'alice@empresa.com', 'senha123', 'Gerente', 'Qual é o nome do seu animal de estimação?', 1),
       ('Bob', 'Santos', '987654321', 'bob@empresa.com', 'senha456', 'Analista', 'Qual é o nome da sua mãe?', 2);
       
insert into componente (nome) values
 ('ram'),
 ('cpu'),
 ('disco'),
 ('rede');       

-- Inserindo dados na tabela parametro
INSERT INTO parametro (fkComponenteParametro, maximo, minimo)
VALUES (1, 30.0, 5.0),
       (2, 25.0, 8.0),
       (3, 40.0, 10.0), 
       (4, 4.0, 1.0);

-- Inserindo dados na tabela servidor
INSERT INTO servidor (status, nome, fkEmpresa, fkEndereco, fkParametro)
VALUES ('Ativo', 'Servidor A', 1, 1, 1),
       ('Inativo', 'Servidor B', 2, 2, 2);

-- Inserindo dados na tabela servidor_componente
INSERT INTO servidor_componente (fkServidor, fkComponente)
VALUES (1, 1),
       (1, 2),
       (2, 3),
       (2, 4);
       

select * from componente;

select * from metrica;	



SELECT idMetrica, valor, dataHora, tipo, nome  FROM metrica join componente  on idComponente = fkComponenteMetrica WHERE DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like 'disco';

SELECT idMetrica, valor, dataHora, tipo, nome  FROM metrica join componente  on idComponente = fkComponenteMetrica  WHERE DATE(dataHora) = CURDATE() AND HOUR(dataHora) = HOUR(NOW()) and nome like 'cpu';


