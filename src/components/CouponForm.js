import React from 'react';
import '../assets/CouponForm.css';

const CouponForm = ({ applyDiscount, discountApplied }) => {
    return (
        <div>
            {!discountApplied && (
                <div>
                    <input type="text" placeholder="Enter coupon code" />
                    <button onClick={() => applyDiscount('WEB3BRIDGECOHORTx')}>Apply Coupon</button>
                </div>
            )}
            {discountApplied && <p>Discount Applied: 10% off</p>}
        </div>
    );
};

export default CouponForm;
