const express = require(`express`)
const router = express.Router()
const orderController = require(`../controllers/orderController`)
const auth = require(`../auth`)




router.post(`/checkout`, auth.verify, orderController.createOrder)


router.get(`/`, auth.verify, orderController.getAll)


router.get(`/myOrders`, auth.verify, orderController.getMyOrders)


router.delete(`/remove-order`, auth.verify, orderController.removeOrder)


router.put(`/review/:id`, auth.verify, orderController.review)



module.exports = router;

