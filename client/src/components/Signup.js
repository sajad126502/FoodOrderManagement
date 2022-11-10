import { React, useEffect, useState } from 'react';
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';
import { signup } from './../api/auth';
import { isAuthenticated } from '../helpers/auth';

const Signup = () => {
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
  }, [navigate]);

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    successMsg: false,
    errorMsg: false,
    loading: false
  });

  const { username, email, password, cpassword, successMsg, errorMsg, loading } = data;

  const changeEvent = (e) => {
    setData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value,
        errorMsg: '',
        successMsg: '',
        loading: false
      }
    ));
    console.log(data);
  }

  const submitData = (e) => {
    e.preventDefault();
    if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(cpassword)) {
      setData({ ...data, errorMsg: "All fields are required" });
    } else if (!isEmail(email)) {
      setData({ ...data, errorMsg: "Please enter a valid email" });
    } else if (!equals(password, cpassword)) {
      setData({ ...data, errorMsg: "Passwords does not match" });
    } else {
      const { username, email, password } = data;
      const formData = { username, email, password };
      setData({ ...data, loading: true });
      //sending data to server
      signup(formData)
        .then((response) => {

          setData({
            username: '',
            email: '',
            password: '',
            cpassword: '',
            loading: false,
            successMsg: response.data.successMessage
          })
        })
        .catch(err => {
          console.log("signup error", err);
          setData({
            ...data,
            loading: false,
            errorMsg: err.response.data.errorMessage
          });
        })
    }
  }
  const showSignUp = () => (
    <form className="container" onSubmit={submitData} noValidate >
      <div className="row mb-3">
        <div className="col-sm-12">
          <input value={username} onChange={changeEvent} name="username" type="text" className="form-control" id="text" placeholder="Username" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <input value={email} onChange={changeEvent} name="email" type="email" className="form-control" id="email" placeholder="Email" />
        </div>
      </div>
      <div className="row mb-3">

        <div className="col-sm-12">
          <input onChange={changeEvent} value={password} name="password" type="password" className="form-control" id="password" placeholder="Password" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <input onChange={changeEvent} value={cpassword} name="cpassword" type="password" className="form-control" id="cpasssword" placeholder="Confirm password" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <button type="submit" className="btn btn-primary w-100">Sign up</button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12">
          <p className="text-center" >
            Have an account? <Link style={{ textDecoration: 'none' }} to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </form>
  );
  return (
    <div className="signup-container">
      <div className="row vh-100">
        <div className="col-md-5 mx-auto my-auto" >
          {/* {
            errorMsg && 
              setTimeout(() => setData({...data, errorMsg: false}), 3000)
          } */}
          {loading && <div className="text-center">{showLoading()}</div>}
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {showSignUp()}
        </div>
      </div>
    </div>
  )
}

export default Signup