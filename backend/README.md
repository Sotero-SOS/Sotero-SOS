# Estrutura do Projeto

Explicando como funciona a estrutura do projeto atualmente. (Note que isso é só enquanto usamos html e css basico, caso mude para react, vamos ter que mudar)

---

## 1. Estrutura Principal

- **Arquivo principal**: `run.py`
  - Responsável por rodar a aplicação, criar o banco de dados e adicionar as rotas do site.
  - As rotas estão localizadas em `app/routers`.

---

## 2. Definindo Rotas

### Exemplo de rota GET que retorna HTML

```python
router = APIRouter()
templates = Jinja2Templates(directory="backend/app/templates")

@router.get("/", include_in_schema=False)
async def home(request: Request):
    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    username = request.session.get("user")
    return templates.TemplateResponse("home.html", {"request": request, "user": {"username": username}})
```

- `@router.get` define uma rota GET.
- O parâmetro `include_in_schema=False` faz com que essa rota não apareça na documentação automática da API.
- Se o usuário não estiver logado, redireciona para o login.
- Se estiver, renderiza `home.html`.

---

### Exemplo de rota POST para criação de usuário

```python
@router.post("/register", response_class=HTMLResponse)
def register_post(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_database)
):
    user = session.query(User).filter(User.username == username).first()
    if user:
        return templates.TemplateResponse("register.html", {"request": request, "error": "Usuário já existe"})
    hashed_pwd = pwd_context.hash(password)
    user = User(username=username, hashed_password=hashed_pwd)
    session.add(user)
    session.commit()
    session.refresh(user)
    return RedirectResponse("/auth/login", status_code=302)
```

- Coleta os dados do formulário (`username`, `password`).
- Verifica se o usuário já existe.
- Se não, salva o novo usuário no banco de dados e redireciona para a tela de login.

#### HTML correspondente:

```html
<form method="post" action="/auth/register">
    <label for="username">Usuário:</label><br>
    <input type="text" id="username" name="username" required><br><br>
    <label for="password">Senha:</label><br>
    <input type="password" id="password" name="password" required><br><br>
    <input type="submit" value="Cadastrar">
</form>
```

- O atributo `action` deve bater com a rota do backend (`/auth/register`).
- O método deve ser `post`.
- Os nomes nos inputs devem ser iguais aos parâmetros da rota POST. (no caso a rota está somento com "/register por que todas as rotas desse arquivo já tem o prefixo "/auth"
  

---

### Rotas que recebem argumentos e passam para o HTML

```python
@router.get("/")
async def test_db(
    request: Request,
    session: Session = Depends(get_database)
):
    setores = session.query(Setor).all()
    motoristas = session.query(Motorista).all()
    motivos = session.query(Motivo).all()
    veiculos = session.query(Veiculo).all()
    atendimentos = session.query(Atendimento).all()

    if not user_esta_logado(request):
        return RedirectResponse("/auth/login")
    return templates.TemplateResponse("test_db.html", {
        "request": request,
        "setores": setores,
        "motoristas": motoristas,
        "motivos": motivos,
        "veiculos": veiculos,
        "atendimentos": atendimentos
    })
```

- Busca vários objetos do banco e os envia para o template.

#### Como usar no HTML (Jinja2):

```html
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Turno</th>
            <th>Endereço</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {% for setor in setores %}
        <tr>
            <td>{{ setor.id }}</td>
            <td>{{ setor.nome_setor }}</td>
            <td>{{ setor.turno }}</td>
            <td>{{ setor.endereco }}</td>
            <td><a href="/test_db/setor/edit/{{ setor.id }}">Editar</a></td>
        </tr>
        {% endfor %}
    </tbody>
</table>
```

