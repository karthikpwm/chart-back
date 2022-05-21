const analytic= require('./../models/analytic')


exports.getAll = async (req, res) => {
  if(Object.keys(req.params).length === 0 && req.params.portfolio_id === undefined){
    throw '400:Parameter not Valid'
  }
  let total = await analytic.totalWeightage(req.params.portfolio_id); 
  let result = await analytic.getAll(req.params.portfolio_id)
  res.json({total : total, data : result })
};

exports.fetch = async (req, res) => {
  let total = await analytic.totalWe(); 
  let result = await analytic.fetch()
  res.json({total : total, data : result })
};

exports.sector = async (req, res) => {
  let total = await analytic.totalWe(); 
  let result = await analytic.sector()
  res.json({total : total, data : result })
};

exports.industry = async (req, res) => {
  let total = await analytic.totalWe(); 
  let result = await analytic.industry()
  res.json({total : total, data : result })
};

exports.market = async (req, res) => {
  let total = await analytic.totalWe(); 
  let result = await analytic.market()
  res.json({total : total, data : result })
};


// exports.addRecord = async (req, res) => {
//     if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//       throw '400:Parameter not Valid'
//     }

//     const result = await analytic.insert( req.body )
//     res.json({
//       message: `analytic insert successfully`,
//       insert_id : result
//     })
// };

// exports.upexcel = async (req, res) => {
//   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }

//   const result = await analytic.insert( req.body )
//   res.json({
//     message: `analytic insert successfully`,
//     insert_id : result
//   })
// };

// exports.delete = async(req, res) => {
//   if(Object.keys(req.params).length === 0 && req.params.analytic_id === undefined){
//     throw '400:Parameter not Valid'
//   }

//   const result = await analytic.delete(req.params)
//     res.json({
//       message : 'record delete successfully'
//     })

// };
// exports.uploadRecord = async (req,res) => {

//   const result = await analytic.uploadRecord()
//     res.json({
//       message: `analytic updated successfully`,
//     })
// }

// exports.postUploadRecord = async (req,res) => {
//   if(Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }  
//   const result = await analytic.postUploadRecord(req.body)
//     res.json({
//       message: `analytic updated successfully`,
//     })
// }

exports.upload = async (req,res) => {
  if(req.body.constructor === Object &&  Object.keys(req.body).length === 0){
    throw '400:Parameter not Valid'
  }  
  const result = await analytic.upload(req.body)
    res.json({
      message: `Equity updated successfully`,
      insert_id : result
    })
}

exports.uploadnse = async (req,res) => {
  if(req.body.constructor === Object &&  Object.keys(req.body).length === 0){
    throw '400:Parameter not Valid'
  }  
  const result = await analytic.uploadnse(req.body)
    res.json({
      message: `nse data updated successfully`,
      insert_id : result
    })
}
// exports.updatemarket = async (req, res) => {
//   if(req.body.constructor === Object &&  Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }  
//   const result = await analytic.updatemarket(req.body)
//     res.json({
//       message: `market data updated successfully`,
//       insert_id : result
//     })
 
// };
// exports.updateRecord = async (req,res) => {
//   if(Object.keys(req.params).length === 0 && req.params.analytic_id === undefined){
//     throw '400:Parameter not Valid'
//   }
//   const result = await analytic.updateRecord(req.params.analytic_id, req.body)
//     res.json({
//       message: `analytic updated successfully`,
//     })

// }

// exports.update = async (req,res) => {
//   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }
//   const result = await analytic.update( req.body )
//     res.json({
//       message: `analytic updated successfully`,
//       insert_id : result
//     })
// }
