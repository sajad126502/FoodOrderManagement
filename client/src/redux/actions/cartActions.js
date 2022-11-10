import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (product) => async (dispatch) => {

    // if cart already exists in  local storage use it ,otherwise set to empty array
    const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

    //check if duplicates
    const duplicates = cart.filter((cartItem) => cartItem._id === product._id);

    //if no duplicates ,proceed
    if (duplicates.length === 0) {

        //prepare product data
        const productToAdd = {
            ...product,
            count: 1,
        };
        //add product data to cart
        cart.push(productToAdd);

        //add cart to local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // add cart to redux
        dispatch({
            type: ADD_TO_CART,
            payload: cart,
        });

    }
};

export const removeFromCart = (product) => async (dispatch) => {

    // if cart already exists in  local storage use it ,otherwise set to empty array
    const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

    const newCart = cart.filter((cartItem) => {
        return cartItem._id !== product._id;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));

    dispatch({
        type: REMOVE_FROM_CART,
        payload: newCart
    })

   
};
