import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpecificOrders } from '../redux/actions/orderActions';
import { isAuthenticated } from '../helpers/auth';
function UserOrderdProducts() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate("/admin/dashboard/vieworders");
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/orders');
    }
    else {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(getUserSpecificOrders());
  }, [dispatch]);

  const { orders } = useSelector(state => state.userSpecificOrders);
  return (
    <section>

      {orders.length <= 0 ? (
        <div className="jumbotron">
          <h1 className=" display-4">
            {" "}
            You Have No Orders{" "}
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
            <h1 className=" display-4">Orders</h1>
          </div>

          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  {/* <th scope="col">Quantity</th> */}
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  JSON.parse(order.orderdProducts).map(
                    (item) => {

                      return (
                        <tr key={item._id}>
                          <td scope="row">
                            <div className='d-flex justify-content-center flex-col'>
                              <img
                                style={{ maxWidth: "110px", minWidth: "50px" }}
                                className="img-fluid w-100 img-thumbnail"
                                src={`/uploads/${item.fileName}`}
                                alt=""
                              />
                              <span className='text-center ml-1' style={{ fontSize: 10}}>Qty: {item.count}</span>
                            </div>

                          </td>
                          <td>
                            {item.productName}
                          </td>

                          <td>{item.productPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}</td>
                          {/* <td>
                            {item.count}
                           </td> */}
                          <td>
                            {order.orderStatus}
                          </td>

                        </tr>
                      )

                    }
                  )

                ))}
              </tbody>
            </table>

          </div>

        </>

      )}

    </section>
  )
}

export default UserOrderdProducts