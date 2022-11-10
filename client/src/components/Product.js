import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { useEffect } from 'react';
import { addToCart } from './../redux/actions/cartActions';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId])
  const { product } = useSelector(state => state.products);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
}

  const handleGoBackBtn = e => {
    navigate(-1);
  }

  return (
    <section className='product-page m-4'>
      <button className='btn btn-light text-primary mb-4' onClick={handleGoBackBtn}>Go Back</button>
      {
        product && (
          <div className='row'>
            <div className='col-md-6'>
              <img style={{ width: "100%", objectFit: 'contain', height: '70%' }} className="rounded-t-lg" src={`/uploads/${product.fileName}`} alt="" />
            </div>
            <div className='col-md-5'>
              <h3 className='mb-4'>{product.productName}</h3>
              <p className='text-muted border-top py-2'>
                Price: {product.productPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className='text-muted border-top py-2'>
                Status:
                {product.productQuantity <= 0
                  ? <span style={{ color: 'red' }}> Out of Stock</span>
                  : <span style={{ color: 'green', fontWeight: 'bold' }}> In Stock</span>
                }
              </p>
              <p style={{ maxHeight: '150px' }} className='text-muted border-top py-2 overflow-auto '>
                Description: {product.productDesc}
              </p>
              <button onClick={handleAddToCart} className='btn btn-dark btn-large btn-block mb-2 py-2' disabled={product.productQuantity <= 0}>Add to Cart</button>
            </div>
          </div>
        )
      }
    </section >
  )
}

export default Product