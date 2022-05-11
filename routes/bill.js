const router = require('express').Router()

const { catchErrors } = require('./../handlers/errorHandler')
const billContoller = require('../controllers/billController')

router.post("/insert", catchErrors(billContoller.addBill))

module.exports = router
