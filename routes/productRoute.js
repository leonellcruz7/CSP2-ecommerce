const express = require(`express`)
const router = express.Router()
const productController = require(`../controllers/productController`)
const auth = require(`../auth`)

router.post(`/enlist`, productController.productEnlist)


router.get(`/`, productController.getAll)


router.get(`/search`, productController.searchProduct)


router.delete(`/delist`, productController.deleteProduct)


router.put(`/:id`, productController.updateProduct)


router.put(`/addstock/:id`, productController.addStock)



module.exports = router;