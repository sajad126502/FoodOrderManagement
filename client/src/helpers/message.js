import React from 'react';

export const showErrorMsg = (msg) => {
    return <>
        <div className="alert alert-danger msg" role="alert">
            {msg}
        </div>
    </>
}

export const showSuccessMsg = (msg) => {
    return <div className="alert alert-success msg" role="alert">
        {msg}
    </div>
};



