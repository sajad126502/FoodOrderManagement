const Order = require("../models/Order")
const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/Product');



exports.orderController = async (req, res) => {
    console.log("order controller hits......", req.body);

    const { shippingAddress, cart, paymentMethod, user } = req.body;
    // console.log(JSON.stringify(shippingAddress))
    // console.log(JSON.stringify(cart));

    try {
        const cartId = cart[0]._id
        const count = parseInt(cart[0].count)
        console.log(count)
        const order = new Order();
        const product = await Product.findById(cartId)
        if (!(product.productQuantity >=count)) {
            console.log("ueriweyrywireywiyriwyrwiyriwyriwyriwyrw")
            res.status(400).json({
                errorMessage: `plz reduce your quantity only ${product.productQuantity} items are left`
            })
            return
        }
        await Product.findByIdAndUpdate(cartId, { productQuantity: product.productQuantity - count }, { new: true })
        console.log(product)
        order.userId = user._id;
        order.shippingDetails = JSON.stringify(shippingAddress);
        order.orderdProducts = JSON.stringify(cart)
        order.paymentMode = paymentMethod;
        await order.save();
        res.status(200).json({
            successMessage: `Order Placed Sucessfully`,
        });
    } catch (err) {
        console.log(err, "productController error");
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }


};
exports.getOrdersController = async (req, res) => {
   

    try {
      const orders= await Order.find({}).populate("userId");
      res.json({orders})
        
    } catch (err) {

        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }


};
exports.getSingleUserOrder = async (req, res) => {
   
    
    try {
        const singleUserOrdersId= req.params.id;
        console.log(singleUserOrdersId)
        const singleUserOrders= await Order.findById(singleUserOrdersId).populate("userId");
        res.json({singleUserOrders});
    } catch (err) {
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }


};
//updates status of order
exports.updateOrderStatus = async (req, res) => {
   
    
    try {
        const {id,orderStatus}= req.body;
     
         const singleUserOrders= await Order.findByIdAndUpdate(id,$set={orderStatus:orderStatus},{new:true}).populate("userId");
         console.log(singleUserOrders.orderStatus)
        res.json({singleUserOrders});
    } catch (err) {
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }


};


exports.getUserSpecificOrders = async (req, res) => {
   
    
    try {
        console.log("===========================");
        const user = req.body;
        const orders= await Order.find({userId: ObjectId(user._id)}).sort({"createdAt":-1});
        res.json({orders});
    } catch (err) {
        res.status(500).json({
            errorMessage: `Please try again later`
        });
    }


};