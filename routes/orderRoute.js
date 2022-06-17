const express = require(`express`)
const router = express.Router()
const orderController = require(`../controllers/orderController`)
const auth = require(`../auth`)




router.post(`/create-order`, auth.verify, orderController.createOrder)


router.get(`/`, auth.verify, orderController.getAll)


router.get(`/mycart`, auth.verify, orderController.getMyOrders)


router.delete(`/remove-order`, auth.verify, orderController.removeOrder)



module.exports = router;