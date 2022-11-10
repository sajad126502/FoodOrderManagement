import React, { useEffect } from 'react'
import { isAuthenticated } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import ActionBtns from './ActionBtns';
import AdminCategoryModal from './AdminCategoryModal';
import AdminProductModal from './AdminProductModal';

import { useDispatch } from 'react-redux';
import { readCategory } from './../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActions';
import AdminBody from './AdminBody';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate('/admin/dashboard');
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/user/dashboard');
    }
    else {
      navigate('/signin');
    }
  }, [navigate]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(readCategory());
  }, [dispatch]);

  return (
    <section>  {/*onClick event will reset the message state*/}
      <AdminHeader />
      <ActionBtns />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody />
    </section>
  )
}

export default AdminDashboard
