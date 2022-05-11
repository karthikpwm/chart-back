const place = require('./../models/Place')


exports.getAll = async (_, res) => {
  try {
    const result = await place.getAll()
    res.json(result)

  } catch (e) {
    console.log(e)
    res.status(400).json({
      message : 'something wrong'
    })
  }
};