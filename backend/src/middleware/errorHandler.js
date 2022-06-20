

const errorHandler = (err, req, res, next) => {
  // TODO - Implement logger class 
  if (
    err.name == 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error collection')
  ) {
    res.status(409);
    res.send({ message: err.message });
  } else if (!err.status) {
    res.status(500);
    console.log("errrrr =======", err);
    res.send({ message: 'Something went wrong' });
  } else {
    res.status(err.status);
    res.send({ message: err.message });
  }
}

module.exports = { errorHandler };
