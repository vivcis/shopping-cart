import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductList from "../ProductList";

describe('ProductList component', () => {
    const products = [
        { id: 1, name: 'Product 1', amount: 10 },
        { id: 2, name: 'Product 2', amount: 20 },
        { id: 3, name: 'Product 3', amount: 15 },
    ];

    it('renders product list correctly', () => {
        const addToCart = jest.fn(); // Mock function for addToCart

        const { getByText } = render(<ProductList products={products} addToCart={addToCart} />);

        products.forEach(product => {
            const productElement = getByText(`${product.name} - $${product.amount}`);
            expect(productElement).toBeInTheDocument();

            const addButton = getByText('Add to Cart');
            fireEvent.click(addButton);
            expect(addToCart).toHaveBeenCalledWith(product.id);
        });
    });


});
