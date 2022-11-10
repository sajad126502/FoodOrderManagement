const express = require('express');
const router = express.Router();
const order = require('../controllers/order');

router.post("/", order.orderController);
router.get("/getall",order.getOrdersController)
router.get("/single/:id",order.getSingleUserOrder)
router.put("/single/updatestatus",order.updateOrderStatus)
router.post("/userspecificorders", order.getUserSpecificOrders);


module.exports = router;
