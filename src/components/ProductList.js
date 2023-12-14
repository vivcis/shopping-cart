import React from 'react';
import '../assets/ProductList.css';

const ProductList = ({ products, addToCart }) => {
    const handleAddToCart = (productId) => {
        addToCart(productId); // Trigger the addToCart function when "Add to Cart" button is clicked
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <span>{product.name} - ${product.amount}</span>
                        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
