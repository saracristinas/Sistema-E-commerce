// ==========================
// IMPORTAÇÕES
// ==========================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Imagens
import atmosfera from "../../assets/home-planet-bg.png.webp";
import spaceship from "../../assets/home-spaceship-page.png.webp";
import astronauta from "../../assets/home-astronaut.png.webp";
import cloud1 from "../../assets/home-cloud-1.png.webp";
import cloud2 from "../../assets/home-cloud-2.png.webp";
import cloud3 from "../../assets/home-cloud-3.png.webp";
import stars from "../../assets/stars.png.webp";
import starsGirando from "../../assets/starsgirando.png.webp";
import starFixed from "../../assets/stars.png.webp";
import rocks from "../../assets/home-page-orange-rocks.png.webp";
import rocksBreak from "../../assets/home-rocks.png.webp";
import planetaAmarelo from "../../assets/planet-yellow-sativa.png.webp";

// ==========================
// COMPONENTE LOGIN
// ==========================
function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensagem || "Falha no login");
      }

      const token = await response.text();
      localStorage.setItem("jwtToken", token);
      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  }

  // ==========================
  // JSX RENDERIZADO
  // ==========================
  return (
    <div className="login-container">
      {/* ==========================
          BACKGROUND ANIMADO
      ========================== */}
      <section className="background-animation">
        {/* Estrelas fixas no fundo */}
        <div className="stars">
          <img
            src={starFixed}
            className="img-bg"
            alt="stars"
          />
        </div>

        {/* Rochas da frente cacos amarelo e laranja (acima de tudo)*/}
        <div className="front-rocks-holder">
          <img
            src={rocksBreak}
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

        {/* Planeta amarelo girando com atmosfera */}
        <div className="planet-wrapper">
          <img src={atmosfera} className="planet-atmosphere" alt="atmosphere" />
          <img
            src={planetaAmarelo}
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
      <div className="letreiro-holder">
        <div className="letreiro-texto">
          <span>BEM VINDO  &nbsp;</span>
          <span>BEM VINDO  &nbsp;</span>
          <span>BEM VINDO  &nbsp;</span>
          <span>BEM VINDO  &nbsp;</span>
        </div>
      </div>

      {/* ==========================
          CONTEÚDO DE LOGIN
      ========================== */}
      <div className="login-content">
        <h1 className="login-title">Login</h1>

        {/* Formulário de login */}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        {/* Botões adicionais */}
        <div className="buttons">
          <button onClick={() => navigate("/home")}>Página Inicial</button>
          <button onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

// ==========================
// EXPORTAÇÃO DO COMPONENTE
// ==========================
export default Login;
