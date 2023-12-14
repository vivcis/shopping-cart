import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('App Component', () => {
    test('renders shopping cart title', () => {
        render(<App />);
        const titleElement = screen.getByText('Shopping Cart');
        expect(titleElement).toBeInTheDocument();
    });

    test('adds products to cart', () => {
        render(<App />);
        const addToCartButton = screen.getAllByText('Add to Cart')[0]; // Assuming the first product is added

        fireEvent.click(addToCartButton); // Click the 'Add to Cart' button

        const cartCountElement = screen.getByText('Your Cart (1)');
        expect(cartCountElement).toBeInTheDocument();
    });

    test('removes products from cart', () => {
        render(<App />);
        const addToCartButton = screen.getAllByText('Add to Cart')[0]; // Assuming the first product is added
        fireEvent.click(addToCartButton); // Click the 'Add to Cart' button

        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton); // Click the 'Remove' button

        const emptyCartMessage = screen.getByText('Your Cart is Empty');
        expect(emptyCartMessage).toBeInTheDocument();
    });

});
