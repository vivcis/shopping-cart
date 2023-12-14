import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShoppingCart from '../ShoppingCart';

describe('ShoppingCart component', () => {
    const cart = [
        { id: 1, name: 'Product 1', amount: 10, quantity: 2 },
        { id: 2, name: 'Product 2', amount: 20, quantity: 1 },
    ];

    const increaseQuantity = jest.fn();
    const decreaseQuantity = jest.fn();
    const removeFromCart = jest.fn();
    const totalAmount = 50; // Example total amount
    const applyDiscount = jest.fn();

    it('renders cart items correctly', () => {
        const { getByText, getByPlaceholderText } = render(
            <ShoppingCart
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                totalAmount={totalAmount}
                applyDiscount={applyDiscount}
                discountApplied={false}
            />
        );

        cart.forEach((item) => {
            const productName = getByText(`${item.name} - $${item.amount}`);
            expect(productName).toBeInTheDocument();

            const increaseButton = getByText('+');
            fireEvent.click(increaseButton);
            expect(increaseQuantity).toHaveBeenCalledWith(item.id);

            const decreaseButton = getByText('-');
            fireEvent.click(decreaseButton);
            expect(decreaseQuantity).toHaveBeenCalledWith(item.id);

            const removeButton = getByText('Remove');
            fireEvent.click(removeButton);
            expect(removeFromCart).toHaveBeenCalledWith(item.id);
        });

        const totalAmountElement = getByText(`Total Amount: $${totalAmount}`);
        expect(totalAmountElement).toBeInTheDocument();
    });

    it('applies discount when the apply coupon button is clicked', () => {
        const { getByPlaceholderText, getByText } = render(
            <ShoppingCart
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                totalAmount={totalAmount}
                applyDiscount={applyDiscount}
                discountApplied={false}
            />
        );

        const couponInput = getByPlaceholderText('Enter coupon code');
        fireEvent.change(couponInput, { target: { value: 'WEB3BRIDGECOHORTx' } });

        const applyCouponButton = getByText('Apply Coupon');
        fireEvent.click(applyCouponButton);
        expect(applyDiscount).toHaveBeenCalledWith('WEB3BRIDGECOHORTx');
    });

});
