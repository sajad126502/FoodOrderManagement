import React from 'react'
import { useSelector } from 'react-redux';
import CardOne from './CardOne';

const AdminBody = () => {
    const { products } = useSelector(state => state.products);
    return (
        <div className='container'>
            <div className='row'>
                <div className='d-flex flex-wrap justify-content-center'>
                    {
                      products && products.map((product) => (
                            // <Card key={product._id} product={product} adminPage={true}/>
                            <CardOne key={product._id} product={product} adminPage={true}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminBody;
