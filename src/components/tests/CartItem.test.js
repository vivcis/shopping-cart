import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

describe('CartItem component', () => {
    const item = {
        id: 1,
        name: 'Test Product',
        amount: 15,
        quantity: 2,
    };

    const increaseQuantity = jest.fn();
    const decreaseQuantity = jest.fn();
    const removeFromCart = jest.fn();

    it('renders cart item correctly and handles actions', () => {
        const { getByText } = render(
            <CartItem
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
            />
        );

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

});
