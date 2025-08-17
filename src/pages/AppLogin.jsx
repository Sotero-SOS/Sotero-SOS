import Input from "../components/Input";
import Button from "../components/Button";

function AppLogin() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2 bg-amber-50 rounded-4xl m-10 p-10">
        <img src="sotero.png" alt="Logo SOS" className="size-3/4" />
        <h1>Sistema SOS</h1>
        <div>
          <Input
            label={"Usuário"}
            placeholder={"Digite seu usuário..."}
            type={"text"}
          />
        </div>
        <div>
          <label htmlFor="senha"></label>
          <Input
            label={"Senha"}
            placeholder={"Digite sua senha..."}
            type={"password"}
          />
        </div>
        <a>Esqueceu a senha?</a>
        <Button to="/Home">Entrar</Button>
      </div>
    </div>
  );
}

export default AppLogin;
