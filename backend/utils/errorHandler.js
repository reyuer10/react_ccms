const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  } else {
    return res.status(500).send({ message: "Internal Server error!" });
  }
};
