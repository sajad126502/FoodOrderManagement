import React from "react";
import { Link } from "react-router-dom";
import Shipping from "./Shipping";

const ProgressBar = ({ step1, step2, step3 }) => {
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {/* step 1 */}
                    {step1 ? (
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/shipping">Shipping</Link>
                        </li>
                    ) : (
                        <li className="breadcrumb-item" aria-current="page">
                            <Link className="text-muted" style={{ textDecoration: "none", cursor: 'not-allowed' }} to="#">
                                Shipping
                            </Link>
                        </li>
                    )}

                    {/* step 2*/}

                    {step2 ? (
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/orderSummary">Order Summary</Link>
                        </li>
                    ) : (
                        <li className="breadcrumb-item" aria-current="page">
                            <Link className="text-muted" style={{ textDecoration: "none", cursor: 'not-allowed' }} to="#">
                                Order Summary
                            </Link>
                        </li>
                    )}

                    {/* step 3 */}

                    {step3 ? (
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/payment">Payment</Link>
                        </li>
                    ) : (
                        <li className="breadcrumb-item" aria-current="page">
                            <Link className="text-muted" style={{ textDecoration: "none", cursor: 'not-allowed' }} to="#">
                                Payment
                            </Link>
                        </li>
                    )}

                    
                </ol>
            </nav>
        </>
    );
};

export default ProgressBar;
