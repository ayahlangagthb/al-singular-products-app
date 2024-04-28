import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product, productSales }) {
  const [salesSummary, setSalesSummary] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    // Check if productSales is defined and not empty
    if (productSales && productSales.length > 0) {
      // Calculate total sales and total revenue
      const totalSales = productSales.reduce((acc, sale) => acc + sale.saleQty, 0);
      const totalRevenue = productSales.reduce((acc, sale) => acc + (sale.salePrice * sale.saleQty), 0);
      // Update sales summary state
      setSalesSummary({ totalSales, totalRevenue });
      // Highlight the card when product sales are updated
      setHighlighted(true);
      // Remove highlight after 20 seconds
      const timeoutId = setTimeout(() => setHighlighted(false), 20000);
      return () => clearTimeout(timeoutId);
    } else {
      // If productSales is not available or empty, set salesSummary to null
      setSalesSummary(null);
    }
  }, [productSales]);

  return (
    <div className={`product-card ${highlighted ? 'highlighted' : ''}`}>
      {/* Display all properties of the product */}
      {Object.entries(product).map(([key, value]) => (
        key === 'image' ? (
          <img key={key} src={value} alt={product.description} />
        ) : (
          <p key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
          </p>
        )
      ))}
      {/* Display total sales and total revenue */}
      {salesSummary ? (
        <div>
          <p>Total Sales: {salesSummary.totalSales}</p>
          <p>Total Revenue: R{salesSummary.totalRevenue.toFixed(2)}</p>
        </div>
      ) : (
        // Render a message if salesSummary is not available
        <p>No sales data available</p>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  productSales: PropTypes.array,
};

export default ProductCard;
