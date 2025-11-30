export const responseMiddleware = (req, res, next) => {
  res.success = (message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, message, data });
  };

  res.error = (message, statusCode) => {
    return res.status(statusCode).json({ message });
  };

  res.create = (message, data = null) => {
    return res.status(201).json({ status: true, message, data });
  };

  res.update = (message, data = null) => {
    return res.status(200).json({ status: true, message, data });
  };

  res.delete = (message, data = null) => {
    return res.status(200).json({ message, data });
  };

  next();
};
