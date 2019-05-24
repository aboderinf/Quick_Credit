import jwt_decode from 'jwt-decode';

export default class Token {
  static checkAdmin(req, res, next) {
    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    const decoded = jwt_decode(token);
    console.log(decoded);
    if (decoded.isadmin) {
      next();
    } else {
      return res.status(400).json({
        status: 403,
        error: 'UNAUTHORIZED',
        message: 'You must be signed in as Admin to access this route',
      });
    }
  }

  static checkUser(req, res, next) {
    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    const decoded = jwt_decode(token);
    console.log(decoded);
    if (decoded.isadmin === false) {
      next();
    } else {
      return res.status(400).json({
        status: 403,
        error: 'UNAUTHORIZED',
        message: 'You must be signed in as User to access this route',
      });
    }
  }
}

//     let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
// const verifyToken = (token) =>{
// jwt.verify(token, 'shhhhh', function(err, decoded) {
//     console.log(decoded.foo) // bar
//   })
// }
