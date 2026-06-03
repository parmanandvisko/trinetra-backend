const Settings = require('./settings.model')
const { success, error } = require('../../utils/response')

const get = async (req, res) => {
  try {
    let settings = await Settings.findOne().lean()
    if (!settings) settings = await Settings.create({})
    return success(res, settings)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: false }
    ).lean()
    return success(res, settings, 'Settings updated successfully')
  } catch (err) { return error(res, err.message) }
}

module.exports = { get, update }
