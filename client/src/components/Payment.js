import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../helpers/auth';

const Payment = () => {
	const [paymentMethod, setPaymentMethod] = useState({ 'paymentMode': "POD" })
	const { shippingAddress } = useSelector(state => state.order);
	const { cart } = useSelector(state => state.cart);
	const { loading } = useSelector(state => state.loading);
	const user = JSON.parse(localStorage.getItem('user'));
	const navigate=useNavigate();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			//For admin
			navigate("/admin/dashboard/vieworders");
		}
		else if (isAuthenticated() && isAuthenticated().role === 0) {
			//For user
			(JSON.parse(localStorage.getItem('cart')).length > 0 && localStorage.getItem("shippingAddress")) ? navigate("/payment") : navigate("/shipping");

		}
		else {
			navigate('/signin');
		}
	}, [navigate]);

	const handleSubmit = () => {
		try {

			const data = {
				shippingAddress: shippingAddress,
				cart: cart,
				paymentMethod: paymentMethod.paymentMode,
				user
			}
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			}
			const response = axios.post('api/order', data, config);
			if(!loading){

				 navigate("/orders")
			}
			
		}
		catch(e){

		}
	}
	const handleChange = (e) => {
		setPaymentMethod({ 'paymentMode': e.target.value })

	}
	return (
		<section className='m-4 p-2'>
			<div className='jumbotron p-1'>
				<h5>
					<ProgressBar step1 step2 step3 />
				</h5>
			</div>

			<div className='container border border py-4'>
				<div className='row justify-content-center'>
					<div className='col-md-8'>
						<h6 className='font-weight-bold mb-4'>Payment</h6>

						<form onSubmit={e => e.preventDefault()}>
							<div className='form-check'>
								<input
									className='form-check-input '
									type='radio'
									name='paymentMethod'
									value='DC'
									disabled
									onChange={handleChange}

								/>
								<label className='form-check-label'>
									Debit Card 
								</label>
							</div>
							<div className='form-check'>
								<input
									className='form-check-input'
									type='radio'
									name='paymentMethod'
									value='POD'
									onChange={handleChange}
									checked
								/>
								<label className='form-check-label'>
									Pay on Delivery
								</label>
							</div>
							<button onClick={handleSubmit} className='btn btn-primary mt-3'>
								Continue
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Payment;