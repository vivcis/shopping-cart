import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CouponForm from '../CouponForm';

describe('CouponForm component', () => {
    it('renders coupon form and applies discount', () => {
        const applyDiscount = jest.fn();
        const discountApplied = false;

        const { getByPlaceholderText, getByText } = render(
            <CouponForm applyDiscount={applyDiscount} discountApplied={discountApplied} />
        );

        const couponInput = getByPlaceholderText('Enter coupon code');
        expect(couponInput).toBeInTheDocument();

        const applyCouponButton = getByText('Apply Coupon');
        fireEvent.click(applyCouponButton);
        expect(applyDiscount).toHaveBeenCalledWith('WEB3BRIDGECOHORTx');

        // Assuming discountApplied will be updated to true after applying the coupon
        const discountAppliedMessage = getByText('Discount Applied: 10% off');
        expect(discountAppliedMessage).toBeInTheDocument();
    });

    it('does not show discount applied message if already applied', () => {
        const applyDiscount = jest.fn();
        const discountApplied = true;

        const { queryByText } = render(
            <CouponForm applyDiscount={applyDiscount} discountApplied={discountApplied} />
        );

        const discountAppliedMessage = queryByText('Discount Applied: 10% off');
        expect(discountAppliedMessage).toBeNull();
    });

});
