import { Link } from 'react-router-dom';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import './Home.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, addToCart, onProductClick }) => (
  <div className="card" onClick={() => onProductClick(product.id)}>
    <div className="card_img">
      <img src={product.imageUrl || product.thumb} alt={product.product_name || product.name} />
    </div>
    <div className="card_header">
      <h2>{product.name || product.product_name}</h2>
      <p>{product.description}</p>
      <p className="price">R${(product.price || product.value || 0).toFixed(2)}</p>
      <button className="btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
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
  const [apiProducts, setApiProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("Todos os Produtos");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Todos os Produtos");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

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

  const handleCheckout = async () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      alert("Você precisa estar logado para finalizar a compra!");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      paymentMethod: "pix",
    };

    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP! status: ${response.status}`);
      }

      const orderConfirmation = await response.json();
      alert(`Compra finalizada com sucesso! Pedido ID: ${orderConfirmation.orderId}. Total: R$${orderConfirmation.total.toFixed(2)}`);
      setCart([]);
      localStorage.removeItem('cart');
      setIsCartOpen(false);
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      alert(`Falha ao finalizar a compra: ${error.message}`);
    }
  };

  const filterProductsByCategory = async (categoryName = "Todos os Produtos") => {
    setSectionTitle(categoryName);
    setActiveCategory(categoryName);
    setIsCategoryDropdownOpen(false);

    setIsLoadingProducts(true);
    setProductError(null);
    try {
      const categoryFilter = categoryName === "Todos os Produtos" ? "" : `?category=${categoryName}`;
      const response = await fetch(`http://localhost:8080/products${categoryFilter}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiProducts(data.map(p => ({
          id: p.id,
          product_name: p.name,
          description: p.description,
          price: p.price,
          thumb: p.imageUrl,
          currency: 'R$'
      })));
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
      setProductError(error.message);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    filterProductsByCategory();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryError(null);
      try {
        const response = await fetch('http://localhost:8080/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategoryError(error.message);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

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

  const handleOpenProductModal = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar detalhes do produto: ${response.status}`);
      }
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Erro ao carregar detalhes do produto:", error);
      alert("Não foi possível carregar os detalhes do produto.");
      setSelectedProduct(null);
    }
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Rayes</div>
        <ul className="nav-links">
          <li onClick={() => filterProductsByCategory("Todos os Produtos")}>Home</li>
          
          <li 
            className="dropdown-toggle"
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            Categorias
            {isCategoryDropdownOpen && (
              <ul className="category-dropdown">
                {isLoadingCategories && <li className="dropdown-item">Carregando...</li>}
                {categoryError && <li className="dropdown-item error">Erro ao carregar</li>}
                {!isLoadingCategories && !categoryError && categories.length === 0 && <li className="dropdown-item">Nenhuma categoria</li>}
                {!isLoadingCategories && !categoryError && (
                  <>
                    <li
                      className={`dropdown-item ${activeCategory === "Todos os Produtos" ? "active" : ""}`}
                      onClick={() => filterProductsByCategory("Todos os Produtos")}
                    >
                      Todos os Produtos
                    </li>
                    {categories.map(category => (
                      <li
                        key={category.id}
                        className={`dropdown-item ${activeCategory === category.name ? "active" : ""}`}
                        onClick={() => filterProductsByCategory(category.name)}
                      >
                        {category.name}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </li>
          
          {/* O item "About Us" foi removido daqui */}
          <li>
            <Link to="/my-orders" style={{ textDecoration: 'none', color: 'inherit' }}>
              Meus Pedidos
            </Link>
          </li>
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

      <main className="main-content">
        <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
           <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <img src={item.thumb || item.imageUrl} alt={item.product_name || item.name} />
                    <div className="cart-item-info">
                      <p>{item.product_name || item.name}</p>
                      <p>{item.currency || 'R$'}{ (item.price || item.value || 0).toFixed(2)} × {item.quantity}</p>
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
              <div className="cart-summary">
                <p>Total: {cart.reduce((total, item) => total + (item.price || item.value || 0) * item.quantity, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <button className="btn-checkout" onClick={handleCheckout}>
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </aside>

        <h1 className="section-title">{sectionTitle}</h1>
        <div className="products-grid">
          {isLoadingProducts && <p>Carregando produtos...</p>}
          {productError && <p>Erro ao carregar produtos: {productError}</p>}
          {!isLoadingProducts && !productError && apiProducts.length === 0 && <p>Nenhum produto encontrado.</p>}
          {!isLoadingProducts && !productError && apiProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
              onProductClick={handleOpenProductModal}
            />
          ))}
        </div>
      </main>

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={handleCloseProductModal}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseProductModal}>✕</button>
            <div className="modal-product-details">
              <img src={selectedProduct.imageUrl || selectedProduct.thumb} alt={selectedProduct.name || selectedProduct.product_name} className="modal-product-image" />
              <div className="modal-product-info">
                <h2>{selectedProduct.name || selectedProduct.product_name}</h2>
                <p className="modal-product-description">{selectedProduct.description}</p>
                <p className="modal-product-price">R${(selectedProduct.price || selectedProduct.value || 0).toFixed(2)}</p>
                <button className="btn" onClick={() => {
                  handleAddToCart(selectedProduct);
                  handleCloseProductModal();
                }}>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>
      )}

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