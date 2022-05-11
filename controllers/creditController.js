const credit = require('./../models/Credit')


exports.getAllCustomerCredit = async (req, res) => {
  const result = await credit.getAllCustomerCredit( req.params.customer_id )

  res.json(result)
};

exports.addRecord = async (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      throw '400:Parameter not Valid'
    }

    const result = await credit.insert( req.body )
    res.json({
      message: `credit insert successfully`,
      insert_id : result
    })
};

exports.findOne = async (req, res) => {
  try {
    const result = await credit.findOne( req.params.credit_id )
    res.json(result)
  } catch(e) {
    res.json({
      message : e?.message || 'Something Problem'
    })
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const result = await credit.deleteRecord( req.params.credit_id )
    res.json(result)
  } catch(e) {
    res.json({
      message : e?.message || 'Something Problem'
    })
  }
};

exports.updateRecord = async (req,res) => {
  try {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      throw '400:Parameter not Valid'
    }
    await credit.update( req.params.credit_id, req.body )
    res.json({
      message: `credit Update successfully`
    })
  } catch (e) {
    res.json({
      message : e?.message || 'Something Problem' 
    })
  }
}