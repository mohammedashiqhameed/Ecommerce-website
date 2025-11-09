import React, {useState, useEffect} from "react";
import { fetchProducts } from "../api";
import ImageCarousel from "../components/ImageCarousel";

// Sample products with images if backend doesn't have products
const sampleProducts = [
  {
    id: "1",
    name: "Classic White Shirt",
    description: "Comfortable cotton shirt for everyday wear",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1594938291221-94f18ab4e9ae?w=500&h=500&fit=crop",
    stock: 50
  },
  {
    id: "2",
    name: "Blue Denim Shirt",
    description: "Stylish denim shirt perfect for casual occasions",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    stock: 30
  },
  {
    id: "3",
    name: "Formal Black Pants",
    description: "Elegant black trousers for formal events",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
    stock: 25
  },
  {
    id: "4",
    name: "Cargo Pants",
    description: "Durable cargo pants with multiple pockets",
    price: 1399,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=500&fit=crop",
    stock: 40
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 2999,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    stock: 20
  },
  {
    id: "6",
    name: "Casual Sneakers",
    description: "Trendy sneakers for everyday style",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
    stock: 35
  },
  {
    id: "7",
    name: "Leather Dress Shoes",
    description: "Premium leather shoes for formal occasions",
    price: 3999,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    stock: 15
  },
  {
    id: "8",
    name: "Ankle Socks Pack",
    description: "Pack of 6 comfortable ankle socks",
    price: 399,
    imageUrl: "https://images.unsplash.com/photo-1586350977773-b3b7abd0da58?w=500&h=500&fit=crop",
    stock: 100
  },
  {
    id: "9",
    name: "Sport Socks",
    description: "Moisture-wicking socks for sports activities",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1586350977773-b3b7abd0da58?w=500&h=500&fit=crop",
    stock: 60
  },
  {
    id: "10",
    name: "Striped Casual Shirt",
    description: "Vibrant striped shirt for a fresh look",
    price: 1099,
    imageUrl: "https://images.unsplash.com/photo-1564256788-8c17907a89b1?w=500&h=500&fit=crop",
    stock: 45
  },
  {
    id: "11",
    name: "Chino Pants",
    description: "Classic chino pants in beige color",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
    stock: 30
  },
  {
    id: "12",
    name: "Canvas Sneakers",
    description: "Lightweight canvas shoes for comfort",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
    stock: 28
  }
];

export default function Home({ addToCart }){
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(()=> {
    setLoading(true);
    fetchProducts()
      .then(fetchedProducts => {
        // Use fetched products if available, otherwise use sample products
        const productsToUse = fetchedProducts && fetchedProducts.length > 0 
          ? fetchedProducts.map(p => ({
              ...p,
              imageUrl: p.imageUrl || getDefaultImage(p.name)
            }))
          : sampleProducts;
        setProducts(productsToUse);
        setFilteredProducts(productsToUse);
      })
      .catch(err => {
        // If backend fails, use sample products
        console.error("Failed to fetch products, using samples:", err);
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(p => {
        const name = p.name.toLowerCase();
        const description = p.description.toLowerCase();
        return name.includes(query) || description.includes(query);
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Helper function to get default image based on product name
  function getDefaultImage(productName) {
    const name = productName.toLowerCase();
    if (name.includes('shirt')) {
      return "https://images.unsplash.com/photo-1594938291221-94f18ab4e9ae?w=500&h=500&fit=crop";
    } else if (name.includes('pant')) {
      return "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop";
    } else if (name.includes('shoe')) {
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop";
    } else if (name.includes('sock')) {
      return "https://images.unsplash.com/photo-1586350977773-b3b7abd0da58?w=500&h=500&fit=crop";
    }
    return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop";
  }

  if (loading && products.length === 0) return <div className="loading">Loading products...</div>;
  
  return (
    <section className="home-section">
      <ImageCarousel />
      <div className="products-section">
        <h2 className="section-title">Our Products</h2>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for shirt, pant, shoe, socks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-filters">
            <button 
              className={`filter-btn ${searchQuery.toLowerCase() === 'shirt' ? 'active' : ''}`}
              onClick={() => setSearchQuery('shirt')}
            >
              Shirt
            </button>
            <button 
              className={`filter-btn ${searchQuery.toLowerCase() === 'pant' ? 'active' : ''}`}
              onClick={() => setSearchQuery('pant')}
            >
              Pant
            </button>
            <button 
              className={`filter-btn ${searchQuery.toLowerCase() === 'shoe' ? 'active' : ''}`}
              onClick={() => setSearchQuery('shoe')}
            >
              Shoe
            </button>
            <button 
              className={`filter-btn ${searchQuery.toLowerCase() === 'sock' ? 'active' : ''}`}
              onClick={() => setSearchQuery('sock')}
            >
              Socks
            </button>
            <button 
              className="filter-btn clear-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found matching your search</div>
        ) : (
          <div className="grid">
            {filteredProducts.map(p => (
              <div key={p.id} className="card">
                <div className="card-image-container">
                  <img 
                    src={p.imageUrl || getDefaultImage(p.name)} 
                    alt={p.name}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop";
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="price">₹{p.price}</div>
                  <div className="stock">Stock: {p.stock}</div>
                  <button 
                    onClick={()=>{
                      addToCart(p, true);
                    }} 
                    disabled={p.stock === 0}
                    className="add-to-cart-btn"
                  >
                    {p.stock === 0 ? "Out of Stock" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
