import React from 'react'
import "./home.css";
import Carousel from 'react-bootstrap/Carousel';
import pic from "./images/banner4.jpg";
import pic2 from "./images/banner5.jpg";
import pic3 from "./images/banner7.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getNewArrivals } from './../redux/actions/filterActions';
import { showLoading } from './../helpers/loading';
import CardOne from './CardOne';
const Home = () => {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector(state => state.filters);
  const { loading } = useSelector(state => state.loading);
  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch])
  return (
    <section className="home-page">
      <Carousel className='banner-image'>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={pic}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={pic2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="item">
          <img
            className="d-block w-100"
            src={pic3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div>
        {
          loading ? (
            <div className='text-center'>{showLoading()}</div>
          ) : (
            <>
              <div className='container'>
              
                <div className='row my-5'>
                  <div className='col d-flex justify-content-center flex-wrap'>
                    {
                      newArrivals && newArrivals.map((newArrival) => (
                        // <Card key={newArrival._id} product={newArrival} homePage={true} />
                        <CardOne key={newArrival._id} product={newArrival} homePage={true} />
                      ))
                    }
                  </div>

                </div>
              </div>
            </>
          )
        }

      </div>
    </section>
  )
}

export default Home