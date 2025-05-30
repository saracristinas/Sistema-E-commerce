import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import './Home.css';
import { gsap } from 'gsap';  
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product_data from '../../Data/Products.jsx';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, addToCart }) => (
  <div className="card">
    <div className="card_img">
      <img src={product.thumb} alt={product.product_name} />
    </div>
    <div className="card_header">
      <h2>{product.product_name}</h2>
      <p>{product.description}</p>
      <p className="price">{product.currency}{product.price}</p>
      <button className="btn" onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  </div>
);

function Home() {
  const el = useRef();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Atualiza o carrinho no localStorage sempre que cart muda
  useLayoutEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } 
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useLayoutEffect(() => {
    gsap.to(".relogio", {
      x: 0,
      opacity: 1,
      rotate: "0deg",
      scrollTrigger: {
        trigger: ".items",
        start: "top 520px",
        end: "bottom 600px",
        scrub: true
      }
    });

    return () => gsap.killTweensOf(".models-item");
  }, []);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Rayes</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Our Products</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
        <div className="search-cart">
          <i className="fa fa-search"></i>
          <i
            className="fa fa-shopping-basket"
            onClick={() => setIsCartOpen(!isCartOpen)}
          ></i>
          <span className="cart-count">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.thumb} alt={item.product_name} />
                  <div className="cart-item-info">
                    <p>{item.product_name}</p>
                    <p>{item.currency}{item.price} × {item.quantity}</p>
                  </div>
                  <button 
                    className="btn-remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <h1 className="section-title">Headphones</h1>
        <div className="products-grid">
          {product_data.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>©Lívia&Sara</p>
        <div className="social-links">
          <i className="fab fa-github"></i>
        </div>
      </footer>
    </div>
  );
}

export default Home;
