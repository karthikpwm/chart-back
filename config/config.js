'user strict';

const mysql = require('mysql2/promise');
console.log(process.env.MYSQL_HOST)
//local mysql db connection
const db = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PWD,
  connectionLimit: 50,
  database : process.env.MYSQL_DB,
  dateStrings: true,

  
  // host     : 'localhost',
  // user     : 'root',
  // password : '',
  // connectionLimit: 50,
  // database : 'chart',
  // dateStrings: true,

});

const withTransaction = async ( db, callback ) => {
  const details = await db.getConnection()
  try {
    await details.beginTransaction();
    const result = await callback();
    await details.commit();
    return result;
  } catch ( err ) {
    await details.rollback();
    throw err;
  } finally {
    details.close()
  }
}

module.exports = {db, withTransaction};