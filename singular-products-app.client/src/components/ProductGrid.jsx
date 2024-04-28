import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, productSales }) {
  const highlightedCardRef = useRef(null);

  useEffect(() => {
    if (highlightedCardRef.current) {
      highlightedCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlightedCardRef]);

  // Check if products is defined and is an array
  if (!Array.isArray(products) || !products || products.length === 0) {
    return <div className="product-grid">No products available</div>;
  }

  // Group products by category
  const groupedProducts = {};
  products.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push(product);
  });

  return (
    <div className="product-grid">
      {/* Render each category as a separate section */}
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="products-section">
          <h2>{category}</h2> {/* Add a header for each category */}
          <div className="product-list">
            {/* Render products within each category */}
            {categoryProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                // Ensure productSales for the current product exists before passing it
                productSales={productSales && productSales[product.id]}
                ref={index === 0 ? highlightedCardRef : null} // Set the ref to the first card
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  productSales: PropTypes.object,
};

export default ProductGrid;
