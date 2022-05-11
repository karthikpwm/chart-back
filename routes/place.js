const router = require('express').Router()
const auth = require('../middlewares/auth')

const { catchErrors } = require('./../handlers/errorHandler')
const placeContoller = require('../controllers/placeController')
router.get("/", catchErrors(placeContoller.getAll))


// router.post("/validation", auth, catchErrors(userContoller.login))

module.exports = router
