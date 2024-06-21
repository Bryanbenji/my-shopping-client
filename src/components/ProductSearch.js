import React, { useState, useEffect } from 'react';
import inventoryApi from '../inventoryApi';

const ProductSearch = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await inventoryApi.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredProducts.map(product => (
          <div key={product.product_id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${product.product_id}.png`} alt={product.product_name} style={{ marginRight: '10px' }} />
            <span>{product.product_name} (Available: {product.stock})</span>
            <button onClick={() => onSelectProduct(product)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
