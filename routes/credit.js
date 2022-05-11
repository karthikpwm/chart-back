const router = require('express').Router()

const { catchErrors } = require('../handlers/errorHandler')
const creditController = require('../controllers/creditController')

router.get("/customer/:customer_id", catchErrors(creditController.getAllCustomerCredit))
router.get("/:credit_id", catchErrors(creditController.findOne))

router.post("/insert", catchErrors(creditController.addRecord))

router.put("/:credit_id", catchErrors(creditController.updateRecord))

router.delete("/:credit_id", catchErrors(creditController.deleteRecord))

module.exports = router
