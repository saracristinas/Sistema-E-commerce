import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import './Home.css';
import { gsap } from 'gsap';  
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product_data from '../../Data/Products.jsx';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => (
  <div className="card">
    <div className="card_img">
      <img src={product.thumb} alt={product.product_name} />
    </div>
    <div className="card_header">
      <h2>{product.product_name}</h2>
      <p>{product.description}</p>
      <p className="price">{product.currency}{product.price}</p>
      <button className="btn">Add to cart</button>
    </div>
  </div>
);

function Home() {
  const el = useRef();
  const tl = useRef();

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
    <>
      {/* Header inline */}
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
          <i className="fa fa-shopping-basket"></i>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="main-content">
        <h1 className="section-title">Headphones</h1>
        <div className="products-grid">
          {product_data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer inline */}
      <div className="footer">
        <p>©Lívia&Sara</p>
        <div className="social-links">
          <i className="fab fa-github"></i>
        </div>
      </div>
    </>
  );
}

export default Home;
