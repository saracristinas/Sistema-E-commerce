// ==========================
// IMPORTAÇÕES
// ==========================
import { useNavigate } from "react-router-dom";
import "./Cadastro.css"; // Importe o CSS específico para a página de cadastro

// Imagens (mantendo as mesmas para manter a consistência visual)
import atmosfera from "../../assets/home-planet-bg.png.webp";
import spaceship from "../../assets/home-spaceship-page.png.webp";
import astronauta from "../../assets/home-astronaut.png.webp";
import cloud1 from "../../assets/home-cloud-1.png.webp";
import cloud2 from "../../assets/home-cloud-2.png.webp";
import cloud3 from "../../assets/home-cloud-3.png.webp";
import stars from "../../assets/stars.png.webp";
import starsGirando from "../../assets/starsgirando.png.webp";
import rocks from "../../assets/home-page-orange-rocks.png.webp";
import rocks2 from "../../assets/home-rocks.png.webp";
import { useState } from "react";

// ==========================
// COMPONENTE CADASTRO
// ==========================
function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // ==========================
  // FUNÇÃO: Lidar com o envio do formulário de cadastro
  // ==========================
  function handleCadastro(event) {
    event.preventDefault();

    // Aqui você pode adicionar a lógica para enviar os dados de cadastro
    // para o seu backend ou realizar outras ações necessárias.

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Dados de cadastro:", { nome, email, senha });
    alert("Cadastro realizado com sucesso!");
    navigate("/login"); // Redireciona para a página de login após o cadastro
  }

  // ==========================
  // JSX RENDERIZADO
  // ==========================
  return (
    <div className="cadastro-container">
      {/* ==========================
          BACKGROUND ANIMADO (REUTILIZANDO DO LOGIN)
       ========================== */}
      <section className="background-animation">
        {/* Estrelas fixas no fundo */}
        <div className="stars">
          <img
            src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/stars.png.webp"
            className="img-bg"
            alt="stars"
          />
        </div>

        {/* Rochas da frente (acima de tudo)*/}
        <div className="front-rocks-holder">
          <img
            src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/home-rocks.png.webp"
            alt="frontal rocks"
            className="img-bg front-rocks"
          />
        </div>

        {/* Astronauta central flutuando */}
        <div className="space-bro-splash-holder">
          <div className="space-bro-splash">
            <img src={astronauta} alt="astronauta" className="astronaut-img" />
          </div>
        </div>

        {/* Nuvens em camadas */}
        <div className="clouds-holder">
          <div className="clouds-inner">
            <img src={cloud3} alt="cloud3" className="cloud-img cloud-3" />
            <img src={cloud2} alt="cloud2" className="cloud-img cloud-2" />
            <img src={cloud1} alt="cloud1" className="cloud-img cloud-1" />
          </div>
        </div>

        {/* Espaçonave no fundo inferior */}
        <div className="spaceship-wrapper">
          <img src={spaceship} className="spaceship-img" alt="spaceship" />
        </div>

        {/* Planeta girando com atmosfera */}
        <div className="planet-wrapper">
          <img src={atmosfera} className="planet-atmosphere" alt="atmosphere" />
          <img
            src="https://hellocopilot.com/wp-content/themes/copilot/img/takeoff/webp/planet-yellow-sativa.png.webp"
            className="planet-img"
            alt="planet"
          />
        </div>
      </section>
      {/* Estrelas girando e fixas */}
      <div className="stars-holder">
        <img src={stars} alt="stars" className="img-bg fixed-stars" />
        <img
          src={starsGirando}
          alt="stars spinning"
          className="img-bg spinning-stars"
        />
        <img src={rocks} alt="orange rocks" className="img-bg side-rocks" />
      </div>

      {/* Texto em background animado (LETREIRO) */}
      <div className="marquee-container">
        <div className="marquee-track">
          <span>CADASTRE-SE&nbsp;</span>
          <span>CADASTRE-SE&nbsp;</span>
          <span>CADASTRE-SE&nbsp;</span>
          <span>CADASTRE-SE&nbsp;</span>
        </div>
      </div>

      {/* ==========================
          CONTEÚDO DE CADASTRO
       ========================== */}
      <div className="cadastro-content">
        <h1 className="cadastro-title">Cadastro</h1>

        {/* Formulário de cadastro */}
        <form onSubmit={handleCadastro} className="cadastro-form">
          <input
            type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        {/* Botões adicionais */}
        <div className="buttons">
          <button onClick={() => navigate("/")}>Página Inicial</button>
          <button onClick={() => navigate("/login")}>Já tem conta? Login</button>
        </div>
      </div>
    </div>
  );
}

// ==========================
// EXPORTAÇÃO DO COMPONENTE
// ==========================
export default Cadastro;