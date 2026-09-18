import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

const API_URL = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/products`, {
        params: {
          search,
          category,
          page,
          limit: 6,
        },
      });

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        onRegister={() => setShowRegister(false)}
        onSwitch={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        onSwitch={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span>◈</span>
          ProductHub
        </div>

        <div className="nav-right">
          <span>Product Catalog</span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">PRODUCT MANAGEMENT</p>
            <h1>Product Catalog</h1>
            <p className="hero-text">
              Manage, search and organize your product inventory from one
              place.
            </p>
          </div>

          <button className="add-button">+ Add Product</button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="stat-card">
            <span>Current Page</span>
            <strong>{page}</strong>
          </div>

          <div className="stat-card">
            <span>Total Pages</span>
            <strong>{totalPages}</strong>
          </div>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <select value={category} onChange={handleCategory}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </section>

        <section className="products-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">INVENTORY</p>
              <h2>Products</h2>
            </div>

            <span>{products.length} products</span>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty">
              <h3>No products found</h3>
              <p>Try changing your search or category filter.</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span>📦</span>
                    )}
                  </div>

                  <div className="product-content">
                    <span className="category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <div className="product-meta">
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      <span>{product.stock} in stock</span>
                    </div>

                    <div className="product-footer">
                      <span>{product.brand}</span>

                      <div>
                        <button>✏️</button>
                        <button>🗑️</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={page === index + 1 ? "active" : ""}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;