const express = require(`express`)
const router = express.Router()
const userController = require(`../controllers/userController`)
const auth = require(`../auth`)

router.post(`/register`, userController.registerUser)

router.get(`/`, userController.getAll)

router.delete(`/delete/`, userController.deleteUser)

router.get(`/login`, userController.login)

router.put(`/change-password/`, userController.changePassword)

router.put(`/set-to-admin1107`, userController.setToAdmin)

router.put(`/find-user`, auth.verify, userController.findUser)

module.exports = router;