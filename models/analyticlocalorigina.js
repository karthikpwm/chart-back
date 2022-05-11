const { NULL } = require('mysql/lib/protocol/constants/types');
const {db} = require('../config/config')

exports.getAll = async (portfolio_id) => {
  try {
    let sql = `SELECT analytic_id, name, weightage,symbol FROM analytic where portfolio_id = ?`; 
    const result =  await db.query(sql,[portfolio_id])
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.fetch = async () => {
  try {
    let sql = `SELECT analytic_id,portfolio_id, name, weightage,symbol FROM analytic`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.totalWe = async () => {
  try {
    let sql = `SELECT sum(weightage) as totalWe  FROM analytic`; 
    const result =  await db.query(sql)
    return result[0][0]['totalWe'];
  } catch (e) {
    throw e
  }
}


exports.totalWeightage = async (portfolio_id) => {
  try {
    let sql = `SELECT sum(weightage) as totalWeightage  FROM analytic where portfolio_id = ?`; 
    const result =  await db.query(sql,[portfolio_id])
    return result[0][0]['totalWeightage'];
  } catch (e) {
    throw e
  }
}

exports.delete = async (param) => {
  try {
    let sql = `DELETE FROM analytic where analytic_id=?`; 
    const result =  await db.query(sql, [param.analytic_id])
    return true;
  } catch (e) {
    throw e
  }
}

exports.insert = async ( param ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("INSERT INTO analytic (name,portfolio_id, weightage, symbol) VALUE ( ?, ?, ?, ? ) ", 
      [ param.name,param.portfolio_id, param.weightage, param.symbol ])
    await con.commit();
    return result[0].insertId;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}


// exports.upexcel = async ( param ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("INSERT INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? ) ", 
//       [ param.portfolio_id,param.name, param.weightage, param.symbol ])
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

exports.postUploadRecord = async(params) =>{
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    await params.bulkData.forEach( async (param) => {
      let sql = `UPDATE analytic set weightage = ? where analytic_id = ?`
      const result =  await con.query(sql, 
        [param.weightage,param.analytic_id])      
      });

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

exports.upload= async(params) =>{
  // const con = await db.getConnection()
  try {
    // await con.beginTransaction();
    // await params.excelData.forEach( async (param) => {
    //   let sql=  `insert INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?, ? )`
    //   const result =  await con.query(sql,
    //      [param.portfolio_id,param.name,param.weightage,param.symbol])
              
    //   });
    //   await con.commit();
    await params.excelData.forEach( async (param) => {
      let sql=  `SELECT * FROM analytic WHERE portfolio_id = ? and symbol = ? LIMIT 1`;
      const result =  await db.query(sql, [param.portfolio_id,param.symbol])   
      console.log(result[0][0]);           
      const analytic_id = result[0][0] != undefined ? result[0][0]['analytic_id'] : null;
     console.log('ansfasf',analytic_id)
      // await con.beginTransaction();
      if(!analytic_id) {
        console.log('insert ')
        let sql=  `insert INTO analytic (portfolio_id,name, weightage, symbol) VALUE ( ?, ?, ?,? )`
        await db.query(sql,
          [param.portfolio_id,param.name,param.weightage,param.symbol])
      } else {
        let sql=  `UPDATE analytic SET weightage = ? WHERE analytic_id = ?`
        await db.query(sql,
          [param.weightage,analytic_id])
      }
      // await con.commit();
                
    });


    return true;
  }
  catch ( err ) {
    // await con.rollback();
    throw err;
  } finally {
    // con.close()
  }

}

exports.updateRecord = async ( analytic_id ,param) =>{
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("UPDATE analytic SET name = ?, weightage = ?, symbol = ? WHERE analytic_id = ? ", 
      [param.name, param.weightage, param.symbol, analytic_id])
    await con.commit();
    return result;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
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
