const express = require(`express`)
const router = express.Router()
const productController = require(`../controllers/productController`)
const auth = require(`../auth`)

router.post(`/enlist`, auth.verify, productController.productEnlist)


router.get(`/all`, productController.getAll)


router.get(`/:id`, productController.getId)


router.post(`/category`, productController.searchCategory)


router.get(`/`, productController.getActive)


router.delete(`/delist`, auth.verify, productController.deleteProduct)


router.put(`/:id`, auth.verify, productController.updateProduct)


router.put(`/addstock/:id`, auth.verify, productController.addStock)


router.put(`/:Id/archive`, auth.verify, productController.archive)



module.exports = router;