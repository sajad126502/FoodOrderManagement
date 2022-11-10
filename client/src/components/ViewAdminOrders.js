import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderdProducts } from '../redux/actions/adminOrdersActions';
import ActionBtns from './ActionBtns';
import AdminDashboard from './AdminDashboard';
import AdminHeader from './AdminHeader';
import { Link } from "react-router-dom";
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';

function ViewAdminOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUserOrders } = useSelector(state => state.adminOrders.orders);
    useEffect(() => {
        dispatch(getAllOrderdProducts())
        console.log("useuuuusfshdfldjs;lafdaalfalsfl;asfl;a;asflasjhldsjasssa")

    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
          //For admin
          navigate('/admin/dashboard/vieworders');
        }
        else if (isAuthenticated() && isAuthenticated().role === 0) {
          //For user
          navigate('/orders');
        }
        else {
          navigate('/signin');
        }
      }, [navigate]);


    return (
        <section>
            <AdminHeader></AdminHeader>
            <div className='container-fluid overflow-scroll m-2'>

                <div className='row'>

                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUserOrders?(
                                    allUserOrders.map((item) => {
                                        let date=new Date();
                                        return item.map(innerItem => (

                                            <tr key={innerItem._id}>
                                                <td scope="row">
                                                  <Link to={`view/${innerItem._id}`}>
                                                  {innerItem._id}
                                                  </Link> 
                                                </td>
                                                <td className=''>
                                                    {innerItem.userId.username}

                                                </td>
                                                <td>
                                                {JSON.parse(innerItem.shippingDetails).phone}


                                                </td>
                                                <td>
                                                    {innerItem.orderStatus}

                                                </td>
                                                <td>
                                                {date.toLocaleDateString("en-US",innerItem.createdAt)}

                                                </td>
                                            </tr>
                                        ))
                                    }
                                    )
                                    ):
                                    ""
                          
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>



        </section>
    )
}

export default ViewAdminOrders