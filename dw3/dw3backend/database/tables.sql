
-- Tabela Usuarios
create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

CREATE TABLE clientes (
    clienteid SERIAL UNIQUE,
    Removido BOOLEAN NOT NULL DEFAULT FALSE,
    NomeRazaoSocial TEXT NOT NULL,
    CPF_CNPJ TEXT,
    Email TEXT,

    -- Definição da Chave Primária
    CONSTRAINT PK_Cliente PRIMARY KEY (clienteID),

    -- Definição da Restrição de Unicidade
    CONSTRAINT UK_Cliente_CPF_CNPJ UNIQUE (CPF_CNPJ)
);


-- Tabela Contas
CREATE TABLE contas (
    contasid SERIAL UNIQUE NOT NULL,
    Removido BOOLEAN NOT NULL DEFAULT FALSE,
    Descricao TEXT NOT NULL,
    Valor DECIMAL NOT NULL,
    DataVencimento DATE NOT NULL,
    DataRecebimento DATE,
    ClienteID INTEGER NOT NULL,

    -- Definição da Chave Primária
    CONSTRAINT PK_Contas PRIMARY KEY (contasID),

    -- Definição da Chave Estrangeira
    CONSTRAINT FK_Contas_Cliente FOREIGN KEY (ClienteID)
        REFERENCES clientes (clienteid)
        ON DELETE RESTRICT -- Opção comum: impede a exclusão de um cliente que tenha contas associadas
        ON UPDATE CASCADE   -- Opção comum: se o ID do cliente mudar (raro), atualiza na tabela contas
);
