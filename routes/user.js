const router = require('express').Router()
const auth = require('../middlewares/auth')

const { catchErrors } = require('./../handlers/errorHandler')
const userContoller = require('../controllers/userController')
router.post("/login", catchErrors(userContoller.login))
router.post("/register", catchErrors(userContoller.register))


// router.post("/validation", auth, catchErrors(userContoller.login))

module.exports = router
