----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS clientes (
    clienteid bigserial constraint pk_clientes PRIMARY KEY,
    documento varchar(50) UNIQUE,
    nomeRazaoSocial VARCHAR(60),
    email VARCHAR(60),
    ativo boolean DEFAULT true
);

insert into clientes values 
    (default, 'Rogerio', '9999988989', 'email@gmail.com'),
    (default, 'Ana', '1111112331313', 'aninha@gmail.com'),
    (default, 'Carlos', '4546476454545', 'carloscarlos@gmail.com'),
    (default, 'Firmina', '23342434234322', 'vofirmina@gmail.com')
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS contas (
    contaid bigserial constraint pk_contas PRIMARY KEY,
    valor numeric(8,2),
    dtaVencimento date,
    dtaRecebimento date,
    descricao VARCHAR(120),
    clienteid bigint constraint fk_cliente_conta REFERENCES clientes,
    ativo boolean DEFAULT true
);

insert into contas values 
    (default, 150.00, '2025-09-09', '2025-08-09', 'conta de luz', 
        (SELECT clienteid from CLIENTES where contasid = 1)),
    (default, 650.00, '2025-09-01', '2025-08-01', 'aluguel', 
        (SELECT clienteid from CLIENTES where contasid = 4)),
ON CONFLICT DO NOTHING;

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

-- Usado para exercícios
/*
create table IF NOT EXISTS clientes (
    clienteid bigserial constraint pk_clientes PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    nome VARCHAR(60),
    endereco VARCHAR(50),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into clientes values 
    (default, 'CLI01', 'João da Silva', 'Rua A1', true),
    (default, 'CLI02', 'Marcia Almeida', 'Rua B2', true)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS pedidos (
    pedidoid bigserial constraint pk_pedidos PRIMARY KEY,
    numero bigint UNIQUE,
    data DATE,
    valortotal numeric(9,2),
    clienteid bigint constraint fk_pedido_cliente REFERENCES clientes,    
    deleted boolean DEFAULT false
);

insert into pedidos values 
 (default, 234, '2020-01-31', 6891.60, (SELECT clienteid from CLIENTES where codigo = 'CLI01'))
 ON CONFLICT DO NOTHING;
*/