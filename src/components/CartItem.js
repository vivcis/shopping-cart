import React from 'react';
import '../assets/CartItem.css';

const CartItem = ({
                      item,
                      increaseQuantity,
                      decreaseQuantity,
                      removeFromCart,
                  }) => {
    const handleRemoveClick = () => {
        console.log('Remove button clicked');
        removeFromCart(item.id);
    };

    return (
        <li key={item.id}>
            <p>
                {item.name} - ${item.amount}
            </p>
            <button className="increaseQuantity" onClick={() => increaseQuantity(item.id)}>+</button>
            <span>{item.quantity}</span>
            <button className="decreaseQuantity" onClick={() => decreaseQuantity(item.id)}>-</button>
            <button className="removeFromCart" onClick={handleRemoveClick}>Remove</button>
        </li>
    );
};

export default CartItem;
