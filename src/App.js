import { useEffect, useState } from "react";
import { products as mockProducts } from "./data/products";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (!storedProducts) {
      localStorage.setItem("products", JSON.stringify(mockProducts));
      setProducts(mockProducts);
    } else {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Магазин</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Поиск товаров..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct}
          />
        ))}
      </div>

      <Modal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
