const success = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data })

const error = (res, message = 'Server Error', statusCode = 500) =>
  res.status(statusCode).json({ success: false, message, data: null })

const paginated = (res, data, total, page, limit, message = 'Success') =>
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
  })

module.exports = { success, error, paginated }
