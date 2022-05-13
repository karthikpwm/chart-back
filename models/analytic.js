const {db} = require('../config/config')

// exports.getAll = async (portfolio_id) => {
//   try {
//     let sql = `SELECT analytic_id, name, weightage,symbol FROM analytic where portfolio_id = ?`; 
//     const result =  await db.query(sql,[portfolio_id])
//     return result[0];
//   } catch (e) {
//     throw e
//   }
// }

exports.fetch = async () => {
  try {
    let sql = `SELECT h.holdings_id,h.isin as isin,h.quantity,n.prevclose,s.stock_name FROM holdings h
    LEFT JOIN stock s ON h.isin = s.isin LEFT JOIN nse n ON h.isin = n.isin`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}


exports.sector = async () => {
  try {
    let sql = `SELECT holdings.holdings_id,holdings.isin as isin,holdings.quantity,nse.prevclose,stock.sector FROM holdings 
    LEFT JOIN stock ON holdings.isin = stock.isin LEFT JOIN nse ON holdings.isin = nse.isin`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.industry = async () => {
  try {
    let sql = `SELECT holdings.holdings_id,holdings.isin as isin,holdings.quantity,nse.prevclose,stock.industry FROM holdings 
    LEFT JOIN stock ON holdings.isin = stock.isin LEFT JOIN nse ON holdings.isin = nse.isin`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.totalWe = async () => {
  try {
    let sql = `SELECT sum(quantity) as totalWe  FROM holdings`; 
    const result =  await db.query(sql)
    return result[0][0]['totalWe'];
  } catch (e) {
    throw e
  }
}


// exports.totalWeightage = async (portfolio_id) => {
//   try {
//     let sql = `SELECT sum(weightage) as totalWeightage  FROM analytic where portfolio_id = ?`; 
//     const result =  await db.query(sql,[portfolio_id])
//     return result[0][0]['totalWeightage'];
//   } catch (e) {
//     throw e
//   }
// }

// exports.delete = async (param) => {
//   try {
//     let sql = `DELETE FROM analytic where analytic_id=?`; 
//     const result =  await db.query(sql, [param.analytic_id])
//     return true;
//   } catch (e) {
//     throw e
//   }
// }

// exports.insert = async ( param ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("INSERT INTO analytic (name,portfolio_id, weightage, symbol) VALUE ( ?, ?, ?, ? ) ", 
//       [ param.name,param.portfolio_id, param.weightage, param.symbol ])
//     await con.commit();
//     return result[0].insertId;
//   } catch ( err ) {
//     console.log(err)
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }


// exports.upexcel = async ( param ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("INSERT INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? ) ", 
//       [ param.portfolio_id,param.name, param.weightage, param.symbol ])
//     await con.commit();
//     return result[0].insertId;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }

// exports.postUploadRecord = async(params) =>{
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     await params.bulkData.forEach( async (param) => {
//       let sql = `UPDATE analytic set weightage = ? where analytic_id = ?`
//       const result =  await con.query(sql, 
//         [param.weightage,param.analytic_id])      
//       });

//       await con.commit();
//       return true;
//   }
//   catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }

// }

exports.upload= async(params) =>{
  // const con = await db.getConnection()
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    con.query('truncate holdings')
    // await params.excelData.forEach( async (param) => {
    //   let sql=  `insert INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? )`
    //   const result =  await con.query(sql,
    //      [param.portfolio_id,param.name,param.weightage,param.symbol])
              
    //   });
    //   await con.commit();
    let i = 0;
    let bulk_data = []
    for (const param of params.excelData) {
      await bulk_data.push([ param.ISIN,param.Quantity] )
      i = i+1;

    }

      console.log(bulk_data)
      // let sql=  `SELECT * from nse where symbol = ? and
      // series = ? and isin = ? LIMIT 1`;
      // const result =  await con.query(sql,[param.SYMBOL,param.SERIES,param.ISIN])  
      
      // let sql1 = `SELECT * FROM nse WHERE symbol = ? LIMIT 1`;
      // const result1 = await db.query(sql1,[param.symbol]) 
      //console.log(result[0][0]);           
      // const nse_id = result[0][0] != undefined ? result[0][0]['nse_id'] : null;
      // //const bsymbol = result[0][4] != undefined ? result[0][4]['bsymbol'] : null;
      // //const nse_id =  result1 != undefined ? result1[0][0]['nse_id'] : null;
     //console.log('ansfasf',nse_id)
      // await con.beginTransaction();
    //  if( !nse_id ) {
      //console.log('insert')
      let sql=  `insert INTO holdings (isin,quantity) VALUES ?`
      //console.log(sql)
      await con.query(sql,
        [bulk_data])

    //  }
    //   else {
    //     //console.log('updated')
    //     let sql=  `UPDATE nse SET close = ?   WHERE symbol = ? and isin = ?`
       
    //     await con.query(sql,
    //       [param.CLOSE,param.SYMBOL,param.ISIN])
    //       //console.log('first sql', sql)
    //       let sql1=  `UPDATE nse SET prevclose = ?   WHERE symbol = ? and isin = ?`
        
    //     await con.query(sql1,
    //       [param.PREVCLOSE,param.SYMBOL,param.ISIN])

    //       //console.log('2nd sql', sql1)
    //       //console.log(sql)
      // }
    // };
    console.log('all instaedr')
    await con.commit();               
    return true;
  }
  catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }


}

// exports.uploadnse= async(params) =>{
//    const con = await db.getConnection()
//   try {
//      await con.beginTransaction();
//     // await params.excelData.forEach( async (param) => {
//     //   let sql=  `insert INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? )`
//     //   const result =  await con.query(sql,
//     //      [param.portfolio_id,param.name,param.weightage,param.symbol])
              
//     //   });
//     //   await con.commit();
    
//     await params.excelData.forEach( async (param) => {
//       console.log('inserted')
//       const result =  await con.query(`insert INTO nse (close, prevclose, symbol,series) VALUE ( ?, ?, ?, ? )`,
//       [param.CLOSE,param.PREVCLOSE,param.SYMBOL,param.SERIES])
//       //const result =  await db.query(sql,[param.SYMBOL])  
//       console.log(result[0][0],param.CLOSE); 
//       // let sql1 = `SELECT * FROM nse WHERE symbol = ? LIMIT 1`;
//       // const result1 = await db.query(sql1,[param.symbol]) 
//     //   console.log(result[0][0]);           
//     //   const nse_id = result[0][0] != undefined ? result[0][0]['nse_id'] : null;
//     //   //const bsymbol = result[0][4] != undefined ? result[0][4]['bsymbol'] : null;
//     //   //const nse_id =  result1 != undefined ? result1[0][0]['nse_id'] : null;
//     //  console.log('ansfasf',nse_id)
//     //   // await con.beginTransaction();
//     //  if( !nse_id ) {
//     //   console.log('insert')
//     //   let sql=  `insert INTO nse (close, prevclose, symbol,series) VALUE ( ?, ?, ?, ? )`
//     //   console.log(sql)
//     //   await db.query(sql,
//     //     [param.CLOSE,param.PREVCLOSE,param.SYMBOL,param.SERIES])

//     //  }
//     //   else {
//     //     console.log('updated')
//     //     let sql=  `UPDATE nse SET close = ?  WHERE symbol = ?`
        
//     //     await db.query(sql,
//     //       [param.CLOSE,param.SYMBOL])

//     //       console.log(sql)
//     //   }
//       // await con.commit(); 
      
//       return result[0].insertId;            
//     });
//     console.log('ho')
//   }
//   catch ( err ) {
//     // await con.rollback();
//     throw err;
//   } finally {
//     // con.close()
//   }

// }

exports.uploadnse= async(params) =>{
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    con.query('truncate nse')
    // await params.excelData.forEach( async (param) => {
    //   let sql=  `insert INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? )`
    //   const result =  await con.query(sql,
    //      [param.portfolio_id,param.name,param.weightage,param.symbol])
              
    //   });
    //   await con.commit();
    let i = 0;
    let bulk_data = []
    for (const param of params.excelData) {
      await bulk_data.push([ param.ISIN,param.CLOSE,param.TIMESTAMP ] )
      i = i+1;

    }

      console.log(bulk_data)
      // let sql=  `SELECT * from nse where symbol = ? and
      // series = ? and isin = ? LIMIT 1`;
      // const result =  await con.query(sql,[param.SYMBOL,param.SERIES,param.ISIN])  
      
      // let sql1 = `SELECT * FROM nse WHERE symbol = ? LIMIT 1`;
      // const result1 = await db.query(sql1,[param.symbol]) 
      //console.log(result[0][0]);           
      // const nse_id = result[0][0] != undefined ? result[0][0]['nse_id'] : null;
      // //const bsymbol = result[0][4] != undefined ? result[0][4]['bsymbol'] : null;
      // //const nse_id =  result1 != undefined ? result1[0][0]['nse_id'] : null;
     //console.log('ansfasf',nse_id)
      // await con.beginTransaction();
    //  if( !nse_id ) {
      //console.log('insert')
      let sql=  `insert INTO nse (isin,prevclose,date) VALUES ?`
      //console.log(sql)
      await con.query(sql,
        [bulk_data])

    //  }
    //   else {
    //     //console.log('updated')
    //     let sql=  `UPDATE nse SET close = ?   WHERE symbol = ? and isin = ?`
       
    //     await con.query(sql,
    //       [param.CLOSE,param.SYMBOL,param.ISIN])
    //       //console.log('first sql', sql)
    //       let sql1=  `UPDATE nse SET prevclose = ?   WHERE symbol = ? and isin = ?`
        
    //     await con.query(sql1,
    //       [param.PREVCLOSE,param.SYMBOL,param.ISIN])

    //       //console.log('2nd sql', sql1)
    //       //console.log(sql)
      // }
    // };
    console.log('all instaedr')
    await con.commit();               
    return true;
  }
  catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }

}


// exports.updateRecord = async ( analytic_id ,param) =>{
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("UPDATE analytic SET name = ?, weightage = ?, symbol = ? WHERE analytic_id = ? ", 
//       [param.name, param.weightage, param.symbol, analytic_id])
//     await con.commit();
//     return result;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }
// exports.update = async(param) =>{
//   const con = await db.getConnection()
//   try {

//     let sql = (`UPDATE analytic set weightage = ? where analytic_id = ?`, 
//     [param.weightage,param.analytic_id])
//     const result =  await db.query(sql)
//     return true;
//   }
//   catch(e){
//     throw e
//   }

// }

// exports.findOne = async (customer_id) => {
//   try {

//     let sql = `SELECT credit_id, amount, date, remarks FROM customer_credit as credit where 
//     credit.deleted = 0 AND credit.credit_id = ?`; 
//     const result =  await db.query(sql, [customer_id])
//     return result[0];
//   } catch (e) {
//     throw e
//   }
// }

// exports.deleteRecord = async ( customer_id ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("UPDATE customer_credit SET deleted = 1 WHERE credit_id = ? ", 
//       [ customer_id  ])
//     await con.commit();
//     return result;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }

// exports.update = async ( credit_id, param ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("UPDATE customer_credit SET amount = ?, date = ?, remarks = ? WHERE credit_id = ? ", 
//       [param.amount, param.date, param.remarks, credit_id ])
//     await con.commit();
//     return result;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }
