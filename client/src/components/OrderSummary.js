import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardOne from "./CardOne";
import { ADD_TO_CART } from './../redux/constants/cartConstants';
import { removeFromCart } from "../redux/actions/cartActions";
import { isAuthenticated } from "../helpers/auth";


function OrderSummary() {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			//For admin
			navigate("/admin/dashboard/vieworders");
		}
		else if (isAuthenticated() && isAuthenticated().role === 0) {
			//For user
			(JSON.parse(localStorage.getItem('cart')).length > 0 && localStorage.getItem("shippingAddress")) ? navigate("/orderSummary"):navigate("/shipping");

		}
		else {
			navigate('/signin');
		}
	}, [navigate]);

  const handleOrder = (evt) => {
    if (isAuthenticated()) {
      navigate('/payment');
    } else {
      navigate('/signin');
    }
  }


  return (
    // <section className=''>
    //   <div className='jumbotron p-1'>
    //     <h5>
    //       <ProgressBar step1 step2 ></ProgressBar>
    //     </h5>
    //   </div>
    <section className="cart-page ">
      <>
        <div className='jumbotron p-1'>
          <h5>
            <ProgressBar step1 step2  ></ProgressBar>
          </h5>
        </div>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              {/* <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead> */}
              <tbody>
                {cart.map((product) => (
                  <tr key={product._id}>
                    <td scope="row">
                      <img
                        style={{ maxWidth: "110px" }}
                        className="img-fluid w-100 img-thumbnail"
                        src={`/uploads/${product.fileName}`}
                        alt=""
                      />
                    </td>
                    <td>
                      {" "}
                      <Link
                        to={`/product/${product._id}`}
                      >
                        {product.productName}
                      </Link>
                    </td>
                    <td>{product.productPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}</td>
                     <td><span> {product.count}</span></td> 
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 border-left">
            <h2>Order Summary</h2>
            <p className="font-weight-bold  border-bottom">{cart.length === 1 ? '(1) item' : `(${cart.length}) items`} </p>
            <p className="font-weight-bold">
              Total: $
              {
                cart.reduce(
                  (currentSum, currentCartItem) =>
                    currentSum + currentCartItem.count * currentCartItem.productPrice,
                  0
                ).toFixed(2)
              }

            </p>
            <button className='btn btn-warning btn-large btn-block mb-2 py-2' onClick={handleOrder}>Confirm Order</button>
          </div>
        </div>
      </>





    </section>
  )
}

export default OrderSummary;