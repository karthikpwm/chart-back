const {db} = require('./../config/config')

const getAll = async () => {
  try {
    const result = await db.query("SELECT place_id, name FROM place WHERE deleted = 0")
    return result[0]
  } catch (e){
    throw e;
  }
}


module.exports = {getAll}