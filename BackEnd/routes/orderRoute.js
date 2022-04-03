const express= require('express');
const { newOrder, getSingleAdminOrder, getSingleUserOrder, getAllOrders,updateOrderStatus, deleteOrder } = require('../controllers/orderController.js');
const {isAuthenticatedUser,isAutherizedRole}= require("../middlewares/auth.js");
const router= express.Router();



router.post("/order/new",isAuthenticatedUser, newOrder);
router.get("/orders/:id",isAuthenticatedUser,getSingleAdminOrder);
router.get("/myorders",isAuthenticatedUser,getSingleUserOrder);
router.get("/admin/orders",isAuthenticatedUser,isAutherizedRole("admin"),getAllOrders);
router.put("/admin/order/:id",isAuthenticatedUser, isAutherizedRole('admin'),updateOrderStatus);
router.delete("/admin/order/:id", isAuthenticatedUser,isAutherizedRole("admin"),deleteOrder);

module.exports= router;