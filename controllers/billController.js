const bill = require('./../models/Bill')

exports.addBill = async (req, res) => {
  try{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      throw '400:Parameter not Valid'
    }

    const result = await bill.insertOrUpdate( req.body )

    console.log(result)
    res.json({
      message: `Customer register successfully`
    })
  } catch(e) {
    throw e
  }
};
