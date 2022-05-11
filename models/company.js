const {db} = require('../config/config')

const getAllCustomerCredit = async (customer_id) => {
  try {
    let sql = `SELECT credit_id, amount, date, remarks FROM customer_credit as credit where 
    credit.deleted = 0 AND credit.customer_id = ?`; 
    const result =  await db.query(sql, [customer_id] )
    return result[0];
  } catch (e) {
    throw e
  }
}

const findOne = async (customer_id) => {
  try {

    let sql = `SELECT credit_id, amount, date, remarks FROM customer_credit as credit where 
    credit.deleted = 0 AND credit.credit_id = ?`; 
    const result =  await db.query(sql, [customer_id])
    return result[0];
  } catch (e) {
    throw e
  }
}

const deleteRecord = async ( customer_id ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("UPDATE customer_credit SET deleted = 1 WHERE credit_id = ? ", 
      [ customer_id  ])
    await con.commit();
    return result;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

const insert = async ( param ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("INSERT INTO customer_credit (amount, date, remarks, customer_id, deleted) VALUE ( ?, ?, ?, ?, 0 ) ", 
      [ param.amount, param.date, param.remarks, param.customer_id ])
    await con.commit();
    return result[0].insertId;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

const update = async ( credit_id, param ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("UPDATE customer_credit SET amount = ?, date = ?, remarks = ? WHERE credit_id = ? ", 
      [param.amount, param.date, param.remarks, credit_id ])
    await con.commit();
    return result;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
module.exports = {insert, update, getAllCustomerCredit, deleteRecord, findOne}