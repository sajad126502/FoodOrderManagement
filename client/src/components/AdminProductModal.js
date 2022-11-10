import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from "./../helpers/loading";
import { useDispatch, useSelector } from "react-redux";
import { clear_message } from "./../redux/actions/messageActions";
import { createProduct } from './../redux/actions/productActions';

const AdminProductModal = () => {
  /* REDUX GLOBAL STATE PROPERTIES*/
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  /* component state properties */
  const [clientSideError, setClientSideError] = useState("");

  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQuantity: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQuantity,
  } = productData;

  const closeBtn = () => {
    dispatch(clear_message());
  };

  const handleProductImage = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.files[0],
    });
    dispatch(clear_message());
  };

  const handleProductChange = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.value,
    });
    dispatch(clear_message());
    setClientSideError('');
  };

  const submitProduct = (e) => {
    e.preventDefault();
    // console.log(productData);
    if (
      productImage === null ||
      isEmpty(productName) ||
      isEmpty(productCategory) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice) ||
      isEmpty(productQuantity)
    ) {
      setClientSideError("All fields are required");
    } else {
      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQuantity", productQuantity);
   
     
      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: '',
        productDesc: '',
        productPrice: '',
        productCategory: '',
        productQuantity: ''
      });
    }
  };
  return (
    <div id="addFoodModal" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={submitProduct}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add New Food</h5>
              <Button
                onClick={closeBtn}
                size="large"
                variant="text"
                className="close"
                data-bs-dismiss="modal"
              >
                <span>
                  <i className="fas text-black fa-times"></i>
                </span>
              </Button>
            </div>
            <div className="modal-body my-3">
              {clientSideError && showErrorMsg(clientSideError)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              {loading && <div className="text-center">{showLoading()}</div>}
              <div className="mb-2">
                {/* <label className='text-secondary'>Upload File</label> */}
                <input
                  name="productImage"
                  onChange={handleProductImage}
                  type="file"
                  className="form-control"
                  placeholder="Upload"
                />
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
              <Button
                onClick={closeBtn}
                variant="text"
                className="close"
                color="secondary"
                data-bs-dismiss="modal"
              >
                Close
              </Button>
              <Button type="submit" variant="text">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;
