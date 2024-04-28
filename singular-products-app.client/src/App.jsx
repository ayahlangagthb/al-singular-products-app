import { useState, useEffect } from 'react';
import { getAllProducts, getProductSales } from './api';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productSales, setProductSales] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      setError(null);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleGetProductSales = async (productId) => {
    setLoading(true);
    try {
      const salesData = await getProductSales(productId);
      // Convert salesData array to an object with productId as key
      const formattedSalesData = {};
      salesData.forEach((sale) => {
        if (formattedSalesData[sale.productId]) {
          formattedSalesData[sale.productId].push(sale);
        } else {
          formattedSalesData[sale.productId] = [sale];
        }
      });
      setProductSales(formattedSalesData);
      setError(null);

      // Scroll to highlighted card
      const highlightedCard = document.querySelector('.product-card.highlighted');
      if (highlightedCard) {
        highlightedCard.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      setError('Error fetching product sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getProductsButton = document.getElementById('getProductsButton');
    const getProductSalesButton = document.getElementById('getProductSalesButton');

    if (getProductsButton && getProductSalesButton) {
      getProductsButton.addEventListener('click', handleGetProducts);
      getProductSalesButton.addEventListener('click', () =>
        handleGetProductSales(document.getElementById('productIdInput').value)
      );
    }

    // Cleanup event listeners on unmount
    return () => {
      if (getProductsButton && getProductSalesButton) {
        getProductsButton.removeEventListener('click', handleGetProducts);
        getProductSalesButton.removeEventListener('click', () =>
          handleGetProductSales(document.getElementById('productIdInput').value)
        );
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Singular.s Products Catalog</h1>
        <button id="getProductsButton" disabled={loading}>
          {loading ? 'Loading...' : 'Get Products'}
        </button>
        <input
          type="number"
          id="productIdInput"
          placeholder="Enter Product ID"
          style={{ width: '130px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px', marginTop: '10px' }}
        />
        <button id="getProductSalesButton" disabled={loading}>
          {loading ? 'Loading...' : 'Get Product Sales'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="main-content">
        <ProductGrid products={products} productSales={productSales} />
        {/* Display product sales grid if data is available */}
        {productSales && Object.keys(productSales).length > 0 && (
          <ProductGrid products={productSales} />
        )}
      </div>
    </div>
  );
}

export default App;
