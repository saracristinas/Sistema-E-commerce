//commit teste

import { useLayoutEffect, useRef } from 'react';
import './Home.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product_data from '../../Data/Products.jsx';

// Registra plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

// Componente de Card de Produto
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

// Componente Home
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
        <div className="app-container">
            <nav className="navbar">
                <div className="logo">Rayes.</div>
                <ul className="nav-links">
                    <li>Home</li>
                    <li>Our Products</li>
                    <li>About Us</li>
                    <li>Contact</li>
                </ul>
                <div className="search-cart">
                    <i className="fas fa-search"></i>
                    <i className="fas fa-shopping-basket"></i>
                </div>
            </nav>
            
            <main className="main-content">
                <h1 className="section-title">Our Watches</h1>
                <div className="products-grid">
                    {product_data.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
            
            <footer className="footer">
                <p>copyright @2020</p>
                <div className="social-links">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                </div>
            </footer>
        </div>
    );
}

export default Home;