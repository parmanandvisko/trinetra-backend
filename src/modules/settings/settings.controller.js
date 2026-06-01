const Settings = require('./settings.model')
const { success, error } = require('../../utils/response')

const get = async (req, res) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) settings = await Settings.create({ activeTheme: 'crimson-gold' })
    return success(res, settings)
  } catch (err) { return error(res, err.message) }
}

const update = async (req, res) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create(req.body)
    } else {
      settings.activeTheme = req.body.activeTheme || settings.activeTheme
      await settings.save()
    }
    return success(res, settings, 'Theme updated successfully')
  } catch (err) { return error(res, err.message) }
}

module.exports = { get, update }
