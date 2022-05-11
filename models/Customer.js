const {db} = require('./../config/config')

const getAll = async () => {
  try {

    let sql = `SELECT customer.customer_id, customer.name, customer.mobile, place.name as place FROM customer
    LEFT JOIN place ON customer.place_id = place.place_id
    WHERE
      customer.deleted = 0`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}

const findOne = async (customer_id) => {
  try {

    let sql = `SELECT customer.customer_id, customer.name, customer.mobile, place.name as place, customer.place_id FROM customer
    LEFT JOIN place ON customer.place_id = place.place_id
    WHERE
      customer.deleted = 0 and customer.customer_id = ? `; 
    const result =  await db.query(sql, customer_id)
    return result[0];
  } catch (e) {
    throw e
  }
}

const deleteRecord = async ( customer_id ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("UPDATE customer SET deleted = 1 WHERE customer_id = ? ", 
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
    const result =  await con.query("INSERT INTO customer (name, mobile, place_id, created_at) VALUE ( ?, ?, ?, ? ) ", 
      [param.name, param.mobile, param.place_id, param.date ])
    await con.commit();
    return result[0].insertId;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

const update = async ( customer_id, param ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("UPDATE customer SET name = ?, mobile = ?, place_id = ? WHERE customer_id = ? ", 
      [param.name, param.mobile, param.place_id, customer_id ])
    await con.commit();
    return result;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
module.exports = {insert, update, getAll, deleteRecord, findOne}