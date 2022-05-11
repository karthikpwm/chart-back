const customer = require('./../models/Customer')


exports.addRecord = async (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      throw '400:Parameter not Valid'
    }
    const result = await customer.insert( req.body )

    res.json({
      message: `Customer register successfully`,
      insert_id : result
    })
};

exports.getAll = async (_, res) => {
  try {
    const result = await customer.getAll()
    res.json(result)
  } catch(e) {
    res.json({
      message : e?.message || 'Something Problem'
    })
  }
};

exports.findOne = async (req, res) => {
  try {
    const result = await customer.findOne( req.params.customer_id )
    res.json(result)
  } catch(e) {
    res.json({
      message : e?.message || 'Something Problem'
    })
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const result = await customer.deleteRecord( req.params.customer_id )
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
    await customer.update( req.params.customer_id, req.body )
    res.json({
      message: `Customer Update successfully`
    })
  } catch (e) {
    res.json({
      message : e?.message || 'Something Problem' 
    })
  }
 
}