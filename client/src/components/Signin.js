import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';
import { signin } from '../api/auth';
import { isAuthenticated, setAuthentication } from './../helpers/auth';
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const search = useLocation().search;

  useEffect(() => {
    // console.log(search);
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate('/admin/dashboard');
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/user/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const changeEvent = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
      successMsg: "",
      loading: false
    })
  }

  const submitFormData = (e) => {
    e.preventDefault();
    if (!isEmail(email) || isEmpty(password)) {
      // alert("Please Insert Correct Data");
      setFormData({ ...formData, errorMsg: "Please Insert Correct Data" });
    }
    else {
      const { email, password } = formData;
      const data = { email, password };
      setFormData({ ...formData, loading: true });
      signin(data)
        .then((response) => {
          // setFormData({
          //   email: '',
          //   password: '',
          //   loading: false,
          //   redirectToDashboard: true
          // })
          //set cookies here
          setAuthentication(response.data.token, response.data.user);
          const redirect = search.split('=')[1];
          console.log(redirect);
          if (isAuthenticated() && isAuthenticated().role === 1) {
            //For admin
            navigate('/admin/dashboard');
          }
          else if (isAuthenticated() && isAuthenticated().role === 0 && !redirect) {
            //For user
            navigate('/user/dashboard');
          } else if (isAuthenticated() && isAuthenticated().role === 0 && redirect) {
            navigate('/shipping');
          }
        })
        .catch((err) => {
          setFormData({
            ...formData,
            errorMsg: err.response.data.errorMessage,
            loading: false
          })

        })
    }


  }
  const showSigninForm = () => (
    <>
      <form className="container" onSubmit={submitFormData} noValidate >
        <div className="row mb-3">
          <div className="col-sm-12">
            <input onChange={changeEvent} name="email" type="email" value={email} className="form-control" id="email" placeholder="Email" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input name="password" onChange={changeEvent} type="password" value={password} className="form-control" id="password" placeholder="Password" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary w-100">Sign in</button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12">
            <p className="text-center" >
              Don't have an account? <Link style={{ textDecoration: 'none' }} to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return (
    <div className="signin-container">
      <div className="row vh-100">
        <div className="col-md-5 mx-auto my-auto" >
          {loading && <div className='text-center'>{showLoading()}</div>}
          {errorMsg && showErrorMsg(errorMsg)}
          {showSigninForm()}
        </div>
      </div>
    </div>
  )
}

export default Signin