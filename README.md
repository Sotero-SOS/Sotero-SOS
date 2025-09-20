# SOS - Sotero
> Website desenvolvido para controle de veículos da rede Sotero

<img src="https://img.shields.io/badge/version-0.0.0-green" /> <img src="https://img.shields.io/badge/npm-v11.4.2-orange" />

Toda a frota de compactadores da Sotero é acompanhada 24 horas por dia. A fim de auxiliá-los neste desafio, o Núcleo de Inovação e Tecnologia (NITE) do Centro Universitário Jorge Amado (UNIJORGE) está desenvolvendo uma plataforma web de monitoramento desses veículos.

<img src="public/sotero.png" />  

## Principais tecnologias:

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)

## Funcionalidades
A plataforma SOS Web permite uma gestão de colaboradores, permitindo operações de CRUD, visualização dos veículos em circulação em tempo real via dashboard, geração de relatórios com estatísticas dos atendimentos realidos pelos operadores da Sotero e integração para notificações em tempo real da localização do veículo, controle de velocidade e sinais de fadiga do motorista.

### IMPORTANTE
**_Algumas das funcionalidades ainda estão sendo desenvolvidas..._**

### Tela de Login

### Aba de Dashboards

---
## Como executar o frontend localmente?
Após clonar o repositório, acesse a pasta que foi clonada
```bash
git clone https://github.com/seu-usuario/sos-sotero.git
cd sos-sotero
```
Estando na pasta, instale as dependências para executar o código:
```bash
npm install
```
Com as dependências instaladas, ele irá deve funcionar normalmente com:
```bash
npm run dev
```
<<<<<<< HEAD
## Como executar o fastAPI?
- Acesse a pasta do `backend` com:
  ```bash
  cd Backend/
  ```
- Instale as dependências do python em requirements:
  ```bash
  pip install -r requirements.txt
  ```
- **Criar uma database no Supabase**
  - Acesse [https://app.supabase.com/](https://app.supabase.com/) e crie um novo projeto (ou acesse um existente).
  - Dentro do projeto, vá até o menu lateral e clique em **SQL Editor**.

- **No SQL Editor, colocar esse código:**
  ```sql
    -- USERS TABLE
  drop table if exists "user" cascade;
  create table "user" (
      id serial primary key,
      username text unique not null,
      hashed_password text not null,
      is_admin boolean not null default false
  );
  
  -- SETOR TABLE
  drop table if exists setor cascade;
  create table setor (
      id serial primary key,
      nome_setor text unique not null,
      turno text
  );
  
  -- VEICULO TABLE
  drop table if exists veiculo cascade;
  create table veiculo (
      cod_veiculo serial primary key,
      categoria text,
      situacao text
  );
  
  -- MOTORISTA TABLE
  drop table if exists motorista cascade;
  create table motorista (
      matricula serial primary key,
      nome text not null,
      setor_id integer references setor(id),
      cod_veiculo integer references veiculo(cod_veiculo) 
  );
  
  -- MOTIVO TABLE
  drop table if exists motivo cascade;
  create table motivo (
      cod_motivo serial primary key,
      descricao text not null,
      tempo_previsto time
  );
  
  -- ATENDIMENTO TABLE
  drop table if exists atendimento cascade;
  create table atendimento (
      nr_atendimento serial primary key,
      auxiliar_de_trafego text,
      fiscal text,
      data date,
      inicio_sos time,
      chegada_na_garagem time,
      final_sos time,
      status text,
      local text,
      matricula_motorista integer not null references motorista(matricula),
      cod_motivo integer not null references motivo(cod_motivo)
  );
  
  
  create index idx_user_username on "user"(username);
  create index idx_setor_nome_setor on setor(nome_setor);
  create index idx_motivo_descricao on motivo(descricao);
  ```
  - Clique em **Run** para executar e criar as tabelas.

- Coloque a URL e a Key do Supabase em run.py

- Execute o servidor em um terminal com o código abaixo:
  ```bash
  uvicorn backend.run:app --reload
  ```
Com isso, o servidor estará executando no endereço http://127.0.0.1:8000  
Só acessar http://127.0.0.1:8000/docs para testar a API  
Utilize `Ctrl + C` para interromper a execução do servidor no terminal

## Imagem do docker
...
=======
>>>>>>> origin

## Como executar o backend localmente?
O backend está sendo migrado de Python para NestJS com MariaDB. Para executar:

### Opção 1: Com Docker (Recomendado)
```bash
cd backend_nestjs
npm run docker:up
```
O backend estará disponível em `http://localhost:3000`

### Opção 2: Desenvolvimento local
```bash
cd backend_nestjs
npm install
npm run start:dev
```

### Rotas disponíveis:
- `GET /sos/setor` - Lista todos os setores
- `POST /sos/setor/create` - Cria um novo setor
- `GET /sos/setor/:id` - Busca setor por ID
- `PATCH /sos/setor/edit/:id` - Atualiza setor
- `DELETE /sos/setor/:id` - Remove setor

**_Backend NestJS + Prisma + MariaDB configurado com Docker para desenvolvimento padronizado._**

## Autores
> (colocar linkedin ou github...)

O projeto está sendo desenvolvido por:
- [João Victor Dórea](https://github.com/Joao-Victor17)
- [Daniel Simonette]
- [Cauã]...
- [Samir]...
- [Fredson Santana](https://github.com/fredson0)
