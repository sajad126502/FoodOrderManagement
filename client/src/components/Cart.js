import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardOne from "./CardOne";
import { ADD_TO_CART } from './../redux/constants/cartConstants';
import { removeFromCart } from "../redux/actions/cartActions";
import { isAuthenticated } from "../helpers/auth";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleQtyChange = (e, product) => {
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')) : [];

    cart.forEach(cartItem => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart
    });
  }

  const handleCheckout = (evt) => {
    if(isAuthenticated()){
      navigate('/shipping');
    }else{
      navigate('/signin?redirect=shipping');
    }
  }
  
  // style={{minHeight:"480px"}}
  return (
    <section className="cart-page m-4">
      {cart.length <= 0 ? (
        <div className="jumbotron">
          <h1 className=" display-4">
            {" "}
            Your cart is empty{" "}
            <button
              className="btn btn-light text-primary m-4"
              onClick={() => navigate(-1)}
            >
              Go Back{" "}
            </button>{" "}
          </h1>
        </div>
      ) : (
        <>
          <div className="jumbotron">
            <h1 className=" display-4"> Cart </h1>
          </div>
          <div className="row">
            <div className="col-md-8 px-0" >
              <table  className="table table-borderless">
                {/* <thead>
                  <tr className="">
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead> */}
                <tbody >
                  {cart.map((product) => (
                    <tr className="w-90 d-flex justify-content-between border-top " key={product._id} >
                      <td scope="row" >
                        <img
                          style={{ maxWidth: "110px", minWidth: "80px" }}
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
                      <td><input min="1" max={product.productQuantity} type="number" onChange={(e) => handleQtyChange(e, product)} value={product.count} /></td>
                      <td>
                        {/* delete button */}
                        <button
                          onClick={() => dispatch(removeFromCart(product))}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          <i className="far fa-trash-alt pr-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 border-left">
              <h2>Cart Summary</h2>
              <p className="font-weight-light text-muted border-bottom">{cart.length === 1 ? '(1) item' : `(${cart.length}) items`} </p>
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
              <button className='btn btn-dark btn-large btn-block mb-2 py-2' onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )
      }
    </section >
  );
};

export default Cart;
