import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { Button } from '@mui/material';
import { showErrorMsg, showSuccessMsg } from './../helpers/message';
import { showLoading } from './../helpers/loading';
// import { createCategory } from './../api/category';
import { useDispatch, useSelector } from 'react-redux';
import { clear_message } from './../redux/actions/messageActions';
import { createCategory } from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('')
    const { successMsg, errorMsg } = useSelector(state => state.messages);
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const [category, setCategory] = useState("");

    // const [message, setMessage] = useState({
    //     errorMsg: "",
    //     successMsg: "",
    //     loading: false
    // });

    // const { errorMsg, successMsg, loading } = message;

    const submitCategory = (e) => {
        console.log(category);
        const data = { category };
        if (!isEmpty(category)){
            dispatch(createCategory(data));
            setCategory('');
        }
        else {
            setClientSideErrorMsg('Empty field...')
        }
    };

    const onChangeInput = (e) => {
        setCategory(e.target.value);
        dispatch(clear_message());
    }

    const closeBtn = () => {
        setCategory("");
        dispatch(clear_message());

    }

    return (
        <>
            <div id='addCategoryModal' className='modal'>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header bg-info text-white'>
                            <h5 className='modal-title'>Add Category</h5>
                            <Button onClick={closeBtn} size="large" variant="text" className='close' data-bs-dismiss='modal'>
                                <span><i className='fas text-black fa-times'></i></span>
                            </Button>
                        </div>
                        <div className='modal-body my-3'>
                            {
                                clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)
                            }
                            {
                                errorMsg && showErrorMsg(errorMsg)
                            }
                            {
                                successMsg && showSuccessMsg(successMsg)
                            }
                            {
                                loading && <div className='text-center'>{showLoading()}</div>
                            }
                            <form>
                                <label className='text-secondary'>Category</label>
                                <input onChange={onChangeInput} value={category} type='text' className='form-control' />
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <Button onClick={closeBtn} variant="text" className='close' color="secondary" data-bs-dismiss='modal'>
                                Close
                            </Button>
                            <Button onClick={() => submitCategory()} variant="text" >Add</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminCategoryModal;