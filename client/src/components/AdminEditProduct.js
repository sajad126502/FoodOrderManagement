import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { readCategory } from './../redux/actions/categoryActions';
import { Button } from '@mui/material';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';
import axios from 'axios';

const AdminEditProduct = () => {

    const [productData, setProductData] = useState({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQuantity: "",
    });
    const [clientSideError, setClientSideError] = useState("");

    const {
        productImage,
        productName,
        productDesc,
        productPrice,
        productCategory,
        productQuantity,
    } = productData;

    //*******************REDUX COMPONENT************* */
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);

    const { successMsg, errorMsg } = useSelector((state) => state.messages);
    const { loading } = useSelector((state) => state.loading);
    //************************************ */
    const { productId } = useParams();
    const navigate = useNavigate();
    console.log(productId);

    useEffect(() => {
        if (!product) {
            dispatch(getProduct(productId));
            dispatch(readCategory());
        } else {
            setProductData({
                productImage: product.fileName,
                productName: product.productName,
                productDesc: product.productDesc,
                productPrice: product.productPrice,
                productCategory: product.productCategory,
                productQuantity: product.productQuantity,
            })
        }
    }, [dispatch, productId, product]);
    console.log(productData);
    console.log(categories);

    //EVENT HANDLERS 
    const handleImageUpload = evt => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.files[0],
        });
    }
    const handleProductChange = evt => {
        setProductData({
            ...productData,
            [evt.target.name]: evt.target.value,
        });
    }
    // on submit updated data
    const submitProduct = async (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append("productImage", productImage);
        formData.append("productName", productName);
        formData.append("productDesc", productDesc);
        formData.append("productPrice", productPrice);
        formData.append("productCategory", productCategory);
        formData.append("productQuantity", productQuantity);

        const config = {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios.put(`/api/food/${productId}`, formData, config)
        .then((res) => {
            console.log("success", res);
            navigate('/admin/dashboard');
        }).catch((err) => {
            console.log("error", err);
        })

    }

    return (
        <>
            <div id="addFoodModal" className='container my-3' >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content br-2 border p-3">
                        <div className="modal-header p-2 bg-warning text-white">
                            <h5 className="modal-title">Update Food</h5>
                        </div>
                        <form onSubmit={submitProduct}>

                            <div className="modal-body my-3">
                                {clientSideError && showErrorMsg(clientSideError)}
                                {errorMsg && showErrorMsg(errorMsg)}
                                {successMsg && showSuccessMsg(successMsg)}
                                {loading && <div className="text-center">{showLoading()}</div>}
                                <div className="d-flex align-items-center  ">
                                    <div className="mb-2" style={{ width: "55%" }}>
                                        <input
                                            name="productImage"
                                            onChange={handleImageUpload}
                                            type="file"
                                            accept='images/*'
                                            className="form-control"
                                            placeholder="Upload"
                                        />

                                    </div>
                                    <div style={{ width: '15%' }}>
                                        {
                                            productImage && productImage.name ? (
                                                // <span>
                                                //     {productImage.name}
                                                // </span>
                                                null
                                            ) : productImage ? (
                                                <img style={{ width: '90px', height: '60px', margin:"7px"}}
                                                    src={`/uploads/${productImage}`} alt='product' />
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="productName"
                                        onChange={handleProductChange}
                                        value={productName}
                                        type="text"
                                        className="form-control"
                                        placeholder="Name Of Food"
                                    />
                                </div>
                                <div className="mb-2">
                                    <textarea
                                        name="productDesc"
                                        onChange={handleProductChange}
                                        value={productDesc}
                                        rows="4"
                                        placeholder="Description"
                                        className="form-control"
                                    ></textarea>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="productPrice"
                                        placeholder="Price"
                                        onChange={handleProductChange}
                                        value={productPrice}
                                        type="number"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <select
                                        name="productCategory"
                                        onChange={handleProductChange}
                                        className="form-control"
                                        value={productCategory}
                                        placeholder="Category"
                                    >
                                        <option defaultChecked value=" ">
                                            Choose any one
                                        </option>
                                        {categories &&
                                            categories.map((data) => (
                                                <option key={data._id} value={data._id}>
                                                    {data.category}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        name="productQuantity"
                                        value={productQuantity}
                                        onChange={handleProductChange}
                                        placeholder="Quantity"
                                        type="number"
                                        min={0}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button type="submit" variant="text">
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEditProduct
