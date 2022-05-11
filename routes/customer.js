const router = require('express').Router()

const { catchErrors } = require('./../handlers/errorHandler')
const customerContoller = require('../controllers/customerController')

router.get("/getAll", catchErrors(customerContoller.getAll))
router.get("/:customer_id", catchErrors(customerContoller.findOne))

router.post("/insert", catchErrors(customerContoller.addRecord))

router.put("/:customer_id", catchErrors(customerContoller.updateRecord))

router.delete("/:customer_id", catchErrors(customerContoller.deleteRecord))

module.exports = router
