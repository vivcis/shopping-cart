import React from 'react';
import '../assets/ShoppingCart.css';

const CartItem = ({ item, className, increaseQuantity, decreaseQuantity, removeFromCart }) => (
    <li key={item.id} className={className}>
        <img src={item.image} alt={item.name} />
        <div className="item-details">
            <h4>{item.name}</h4>
            <p>${item.amount}</p>
        </div>
        <div className="quantity-controls">
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
        </div>
        <button className="remove-item" onClick={() => removeFromCart(item.id)}>Remove</button>
    </li>
);

const ShoppingCart = ({
                          cart,
                          increaseQuantity,
                          decreaseQuantity,
                          removeFromCart,
                          totalAmount,
                          applyDiscount,
                          discountApplied,
                      }) => {
    return (
        <div className="shopping-cart">
            <h2>Your Cart</h2>
            <ul className="cart-items">
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        className="cart-item"
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </ul>
            <p className="total-amount">Total Amount: ${totalAmount}</p>
            {!discountApplied && (
                <div className="coupon-form">
                    <input type="text" placeholder="Enter coupon code" id="coupon-code" />
                    <button onClick={() => applyDiscount('WEB3BRIDGECOHORTx')}>Apply Coupon</button>
                </div>
            )}
            {discountApplied && <p className="discount-message">Discount Applied: 10% off</p>}
        </div>
    );
};

export default ShoppingCart;