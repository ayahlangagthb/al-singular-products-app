import { createRoot } from 'react-dom/client';
import App from './App';
import { getAllProducts, getProductSales } from './api';

async function handleGetProducts() {
  try {
    const products = await getAllProducts();
    console.log('All products:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function handleGetProductSales() {
  const productId = document.getElementById('productIdInput').value;
  try {
    const productSales = await getProductSales(productId);
    console.log('Product sales:', productSales);
    document.getElementById('productSalesResult').innerText = JSON.stringify(productSales);
  } catch (error) {
    console.error('Error fetching product sales:', error);
    document.getElementById('productSalesResult').innerText = 'Error fetching product sales';
  }
}

function Index() {
  return (
    <div>
      <App />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Index />);

// Attach event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getProductsButton').addEventListener('click', handleGetProducts);
  document.getElementById('getProductSalesButton').addEventListener('click', handleGetProductSales);  
});
