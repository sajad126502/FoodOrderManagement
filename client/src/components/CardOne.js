import React from "react";
import pic2 from "./images/banner5.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "./../redux/actions/productActions";
import { addToCart } from './../redux/actions/cartActions';

const CardOne = ({ product, adminPage = false, homePage = false }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    return (
        <>
            <div
                style={{ width: "16rem", height: "24rem" }}
                className="max-w-sm m-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 "
            >
                <img
                    style={{ width: "100%", height: "200px" }}
                    className="rounded-t-lg"
                    src={`/uploads/${product.fileName}`}
                    alt=""
                />
                <div className="p-3 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product.productName}
                    </h5>
                    <div className=" d-flex justify-content-between">
                        <h6 className="mb-3">
                            <span className="text-secondary mr-2">
                                {product.productPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </span>
                        </h6>

                        <p className="text-muted">
                            {product.productQuantity <= 0 ? (
                                <span style={{ color: "red" }}> Out of Stock</span>
                            ) : (
                                <span style={{ color: "green", fontWeight: "bold" }}>
                                    {" "}
                                    In Stock
                                </span>
                            )}
                        </p>
                    </div>
                    <p>
                        {product.productDesc.length > 25
                            ? product.productDesc.substring(0, 25) + "..."
                            : product.productDesc.substring(0, 25)}
                    </p>
                    {adminPage && (
                        <div className="text-center mt-4 d-flex justify-content-end">
                            <Link
                                to={`/admin/edit/product/${product._id}`}
                                type="button"
                                className="btn btn-secondary btn-sm mx-2"
                            >
                                <i className="far fa-edit pr-1"></i> Edit
                            </Link>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => dispatch(deleteProduct(product._id))}
                            >
                                <i className="far fa-trash-alt pr-1"></i> Delete
                            </button>
                        </div>
                    )}
                    {homePage && (
                        <div className="text-center mt-4 d-flex justify-content-end">
                            <Link
                                to={`/product/${product._id}`}
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
                            >
                                View Product
                            </Link>
                            <button onClick={handleAddToCart} type="button" disabled={product.productQuantity <= 0} className="btn btn-warning btn-sm">
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardOne;
