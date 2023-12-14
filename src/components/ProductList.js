import React, { useState } from 'react';
import '../assets/ProductList.css';

const ProductList = ({ products, addToCart }) => {
    const [notification, setNotification] = useState(null);

    const handleAddToCart = (productId) => {
        addToCart(productId);
        console.log(`Adding product with ID ${productId} to the cart`);
        setNotification(`Added ${products.find(product => product.id === productId).name} to the cart`);
        setTimeout(() => {
            setNotification(null);
        }, 10000);
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
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default ProductList;
