const {db} = require('./../config/config')

const insertOrUpdate = async (param) => {
  const con = await db.getConnection()

  try {
    await con.beginTransaction();
    let sql;
    const bill = param.bill
    let bill_id;

    if(bill.bill_id === undefined || parseInt(bill.bill_id) == 0 ){
      sql = "INSERT INTO customer_bill (bill_no, date, net_amount, discount, total, remarks, customer_id, balance) VALUE (?, ?, ?, ?, ?, ?, ?, ?)";      
      const billResult = await con.query(sql,[
        bill.billNo, bill.date, bill.netAmount, bill.discount, bill.total, bill.remarks, bill.customer_id, 0
      ])
      bill_id = billResult[0].insertId
    } else {
      sql = "UPDATE customer_bill SET bill_no = ?, date = ?, net_amount = ?, discount = ?, total = ?, remarks = ?, balance = ? WHERE bill_id = ?";
      await con.query(sql,[
        bill.billNo, bill.date, bill.netAmount, bill.discount, bill.total, bill.remarks, bill.balance, bill.bill_id
      ])
      bill_id = bill.bill_id
    }

    await param.order.forEach(async element => {
      if(element.order_id === undefined || parseInt(element.order_id) == 0){
        sql = `INSERT INTO customer_order ( customer_id, paper_id, bill_id, amount, date, created_at) VALUES ( ?, ?, ?, ?, ?, ?) `
        await con.query(sql, [
          element.customer_id,
          element.paper_id,
          bill_id,
          element.amount,
          element.date,
          element.date,
        ])  
      } else {
        sql = `UPDATE customer_order SET paper_id = ?, amount = ?, date = ?, created_at =? WHERE order_id = ? `
        await con.query(sql, [
          element.paper_id,
          element.amount,
          element.date,
          element.date,
          element.order_id
        ])
      }
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