const {db} = require('./../config/config')

const insertOrUpdate = async (param) => {
  const con = await db.getConnection()

  try {
    await con.beginTransaction();
    let receipt_id, sql;

    const receipt = param.receipt
    if(element.adjustment_id === undefined || parseInt(element.adjustment_id) === 0 ){
      sql = "INSERT INTO customer_receipt (receipt_no, customer_id, date, remarks, amount) VALUE (?, ?, ?, ?, ?)";
      const receiptResult = await con.query(sql,[
        receipt.receiptNo, receipt.customer_id, receipt.date, receipt.remarks, receipt.amount
      ])
      receipt_id = receiptResult[0].insertId
    } else {
      sql = "UPDATE customer_receipt SET date = ?, remarks = ?, amount = ? WHERE receipt_id = ?";
      await con.query(sql,[
        receipt.date, receipt.remarks, receipt.amount, receipt.receipt_id
      ])
    }


    await param.credit.forEach(async element => {
      if(element.adjustment_id === undefined || parseInt(element.adjustment_id) === 0 ){
        sql = `INSERT INTO adjustment_credit ( receipt_id, bill_id, customer_id, amount )`
        await con.query(sql, [
          receipt_id,
          element.bill_id,
          element.customer_id,
          element.amount
        ])
      } else {
        sql = `UPDATE adjustment_credit SET amount = ? WHERE adjustment_id = ? `
        await con.query(sql, [
          element.amount,
          element.adjustment_id,
        ])
      }
    });

    await param.bill.forEach(async element => {
      sql = `UPDATE customer_bill SET balance = ? WHERE bill_id = ?`
      await con.query(sql, [
        element.balance,
        element.bill_id,
      ])  
    });

    await con.commit()
  } catch (e){
    await con.rollback()
    console.log(e)
    throw 'Something wrong please contract admin';
  } finally {
    con.close()
  }
}


module.exports = {insertOrUpdate}