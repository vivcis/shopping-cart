import React from 'react';
import CartItem from './CartItem';
import '../assets/ShoppingCart.css';

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
                    // Render CartItem component for each item in the cart
                    <CartItem
                        key={item.id}
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
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        id="coupon-code"
                    />
                    <button onClick={() => applyDiscount('WEB3BRIDGECOHORTx')}>
                        Apply Coupon
                    </button>
                </div>
            )}
            {discountApplied && (
                <p className="discount-message">Discount Applied: 10% off</p>
            )}
        </div>
    );
};

export default ShoppingCart;