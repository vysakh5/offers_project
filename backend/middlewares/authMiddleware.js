var jwt = require('jsonwebtoken');

exports.isLogedin = (req, res, next) => {
  let authHead = req.headers.authorization;
  //console.log('---->' + authHead);
  if (authHead == undefined) {
    return res.status(401).send({ error: 'no token provided' });
  }
  let token = authHead.split(' ')[1];
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(401).send({
        message: 'Authentication failed invalid Token',
        statusCode: 401,
        error: true,
      });
    } else {
      // console.log(data);
      req.user = data;
      next();
    }
  });
};
