import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './assets/App.css';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', amount: 10 },
    { id: 2, name: 'Product 2', amount: 20 },
    { id: 3, name: 'Product 3', amount: 15 },
    // Add more products here
  ]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      setCart(cartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    calculateTotal();
  }, [cart]);

  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      setCart([...cart, { ...selectedProduct, quantity: 1 }]);
    } else {
      console.error('Product not found.');
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.amount * item.quantity, 0);
    setTotalAmount(total);
  };

  const applyDiscount = (code) => {
    try {
      const couponRegex = /^WEB3BRIDGECOHORT\d{1}$/;
      if (couponRegex.test(code)) {
        const discountedTotal = totalAmount * 0.9; // Apply 10% discount
        setTotalAmount(discountedTotal);
        setDiscountApplied(true);
      } else {
        throw new Error('Invalid coupon code.');
      }
    } catch (error) {
      console.error('Error applying discount:', error.message);
      // Display an error message to the user
    }
  };

  return (
      <Router>
        <div className="App">
          <h1>Shopping Cart</h1>
          <Routes>
            <Route
                exact
                path="/"
                element={<ProductList products={products} addToCart={addToCart} />} // Ensure addToCart is passed down
            />
            <Route
                path="/cart"
                element={
                  <ShoppingCart
                      cart={cart}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      removeFromCart={removeFromCart}
                      totalAmount={totalAmount}
                      applyDiscount={applyDiscount}
                      discountApplied={discountApplied}
                  />
                }
            />
          </Routes>
        </div>
      </Router>
  );
};

export default App;