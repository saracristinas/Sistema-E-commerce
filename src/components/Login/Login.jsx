// 1. Importe o hook 'useNavigate'
import { useNavigate } from "react-router-dom"; // Importe no topo
import './Login.css';

function Login() {
  // 2. Inicialize o hook 'useNavigate' dentro do componente
  const navigate = useNavigate();

  // 3. Crie uma função para lidar com o login (ou qualquer outro evento que deva redirecionar)
  function handleLogin(event) {
    event.preventDefault();

    // Aqui você pode colocar a lógica de login ou validação
    // Depois que o login for bem-sucedido, o navigate é chamado:
    navigate("/home");  // Aqui você redireciona para a página Home ("/")
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>  {/* 4. Quando o formulário for enviado, chama handleLogin */}
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
