import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserOrderdProducts, updateOrderStatus } from '../redux/actions/adminOrdersActions';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

function AdminOrderDetailView() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singleUserOrders } = useSelector(state => state.adminOrders.orders);

    const handleStatusChange = (e) => {
        const data = { id: id, orderStatus: e.target.value }

        dispatch(updateOrderStatus(data));
    }

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            //For admin
            navigate(`/admin/dashboard/vieworders/view/${id}`);
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
        dispatch(getSingleUserOrderdProducts(id))

    }, [dispatch])

    //on order status change

    return (
        <section className='container-fluid p-0 overflow-hidden'>
            <AdminHeader></AdminHeader>
            <div className='row p-4 '>
                <div className='col-md-4 p-4 border-right'>
                    <div className='border-top p-2'>

                        <h2 className='my-2'>User Details</h2>
                        <h5>User : {singleUserOrders ? singleUserOrders.userId.username : ""} </h5>
                        <h6>Email : {singleUserOrders ? singleUserOrders.userId.email : ""}</h6>
                    </div>
                    <div className='border-top p-2 '>
                        <h2 className='my-2'>Shipping Details</h2>
                        <h6>Contact : {singleUserOrders ? JSON.parse(singleUserOrders.shippingDetails).phone : ""}</h6>
                        <h6>Address : {singleUserOrders ? JSON.parse(singleUserOrders.shippingDetails).address : ""}</h6>
                        <h6>Address 2 : {singleUserOrders ? JSON.parse(singleUserOrders.shippingDetails).address2 : ""}</h6>
                        <h6>City : {singleUserOrders ? JSON.parse(singleUserOrders.shippingDetails).city : ""}</h6>
                        <h6>State : {singleUserOrders ? JSON.parse(singleUserOrders.shippingDetails).state : ""}</h6>
                    </div>
                    <div className='border-top p-2 '>
                        <h2 className='my-2'>Payment Details</h2>
                        <h6 className='font-weight-bold'>
                            Total: $

                            {
                                singleUserOrders ? (
                                    JSON.parse(singleUserOrders.orderdProducts).reduce(
                                        (currentSum, currentCartItem) =>
                                            currentSum + currentCartItem.count * currentCartItem.productPrice,
                                        0
                                    ).toFixed(2)
                                ) : ""
                            }
                        </h6>
                        <h6 className='font-weight-bold'>Payment : {singleUserOrders ? (
                            singleUserOrders.paymentMode == "DC" ?
                                (<span className='c-primary text-primary '>Done</span>) :
                                (<span className='c-primary text-danger '>Pending</span>)) :
                            ""}</h6>

                    </div>


                </div>
                <div className='col-md-8'>
                    <div className='p-2'>
                        {singleUserOrders ? (
                            <select onChange={handleStatusChange} className="form-select" aria-label="Default select example">
                                <option selected={singleUserOrders.orderStatus == "pending" ? true : false} value={"pending"}>pending</option>
                                <option selected={singleUserOrders.orderStatus == "packing" ? true : false} value={"packing"}>packing</option>
                                <option selected={singleUserOrders.orderStatus == "shipped" ? true : false} value={"shipped"}>shipped</option>
                                <option selected={singleUserOrders.orderStatus == "deliverd" ? true : false} value={"deliverd"}>deliverd</option>
                            </select>) : ""
                        }
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                {/* <th scope="col">Category</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {singleUserOrders ? (
                                JSON.parse(singleUserOrders.orderdProducts).map((product) => (
                                    <tr key={product._id}>
                                        <td scope="row">
                                            <img
                                                style={{ maxWidth: "110px", minWidth: "60px" }}
                                                className="img-fluid w-100 img-thumbnail"
                                                src={`/uploads/${product.fileName}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            {product.productName}
                                        </td>

                                        <td>{product.productPrice.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}</td>
                                        <td>
                                            {product.count}

                                        </td>
                                        {/* <td><input min="1" max={product.productQuantity} type="number" onChange={(e) => handleQtyChange(e, product)} value={product.count} /></td> */}
                                        {/* <td>
                                            {product.productCategory.category}
                                            -

                                        </td> */}
                                    </tr>
                                ))
                            ) : ""
                            }
                        </tbody>
                    </table>

                </div>




            </div>
        </section>
    )
}

export default AdminOrderDetailView