const {db} = require('./../config/config')

const getAll = async () => {
  try {
    const result = db.query("SELECT name, catergory_id FROM category WHERE deleted = 0")
    return result
  } catch (e){
    throw e;
  }
}


module.exports = {getAll}