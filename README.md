# SOS - Sotero
> website desenvolvido para controle de veículos da rede Sotero

<img src="https://img.shields.io/badge/version-0.0.0-green" /> <img src="https://img.shields.io/badge/npm-v11.4.2-orange" />

escrever descrição do projeto...

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_WEpLY9GEjA9Atknbcjd4sz7biL-1Ir3rcg&s" height="300" width="500"/> (trocar a foto...)

## Principais tecnologias:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [FastAPI](fastapi.tiangolo.com/)
- [Docker](https://www.docker.com/)

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
## Como executar o fastAPI?
- Acesse a pasta do `backend` com:
  ```bash
  cd Backend/
  ```
- Instale as dependências do python em requirements:
  ```bash
  pip install -r requirements.txt
  ```
- Coloque a URL e a Key do Supabase em run.py

- Execute o servidor em um terminal com o código abaixo:
  ```bash
  uvicorn backend.run:app --reload
  ```
Com isso, o servidor estará executando no endereço http://127.0.0.1:8000
<br>
Só acessar http://127.0.0.1:8000/docs para testar a API
<br>
Utilize `Ctrl + C` para interromper a execução do servidor no terminal

## Imagem do docker
...

## Autores
> (colocar linkedin ou github...)

Idealizado por [Jaiane Alves], o projeto foi desenvolvido por:
- [João Victor Dórea]
- [Daniel Simonette]
- [Cauã]...
- [Samir]...
