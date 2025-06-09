// src/components/MyOrders.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link também, se for usar a navbar da Home
import "./MyOrders.css"

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem('jwtToken'); // Pega o token JWT do localStorage

      if (!token) {
        alert("Você precisa estar logado para ver seus pedidos.");
        navigate('/login'); // Redireciona para a página de login se não houver token
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:8080/orders/user/summary', { // URL do backend
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        if (!response.ok) {
          // Lida com erros de autenticação (401) ou permissão (403)
          if (response.status === 401 || response.status === 403) {
            alert("Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.");
            localStorage.removeItem('jwtToken'); // Limpa o token inválido
            navigate('/login'); // Redireciona para login
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro HTTP! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data); // Armazena os pedidos no estado
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]); // navigate como dependência para evitar warnings

  return (
    <div className="my-orders-container">
      {/* Você pode copiar a Navbar da Home aqui para manter a consistência, ou criar um componente Navbar separado */}
      <nav className="navbar">
        <div className="logo">Rayes</div>
        <ul className="nav-links">
          <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
          {/* Pode adicionar um link para Categorias aqui se quiser, ou outro menu */}
          <li>About Us</li>
          <li><Link to="/my-orders" style={{ textDecoration: 'none', color: 'inherit' }}>Meus Pedidos</Link></li> {/* Destaca o link atual */}
        </ul>
        {/* Adicionar busca e carrinho aqui se quiser */}
      </nav>

      <div className="my-orders-content">
        <h1>Meus Pedidos</h1>

        {isLoading && <p>Carregando seus pedidos...</p>}
        {error && <p className="error-message">Erro ao carregar pedidos: {error}</p>}
        {!isLoading && !error && orders.length === 0 && <p>Você ainda não fez nenhum pedido.</p>}

        {!isLoading && !error && orders.length > 0 && (
          <ul className="orders-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <h3>Pedido #{order.id}</h3>
                <p>Data: {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p> {/* Formata a data */}
                <p>Total: {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                {/* O backend retorna items dentro do pedido, você pode exibi-los aqui */}
                {order.items && order.items.length > 0 && (
                  <div className="order-items-detail">
                    <h4>Itens:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} (x{item.quantity}) - {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Você pode copiar o Footer da Home aqui para manter a consistência */}
      <footer className="footer">
        <p>©Lívia&Sara</p>
        <div className="social-links">
          <i className="fab fa-github"></i>
        </div>
      </footer>
    </div>
  );
}

export default MyOrders;