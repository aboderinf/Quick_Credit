const jwt = require ('jsonwebtoken');
import userModel from '../database/users-db';
import bcrypt from 'bcryptjs';

class userController {
  // Post a new user
  static createUser(req, res) {
    userModel.create(req.body)
      .then(({ rows }) => {
        delete rows[0].password;
        return res.status(201).json({
          status: 201,
          data: {
            ...rows[0],
            token: jwt.sign({
              id: rows[0].id,
            }, process.env.JWT_KEY)
          },
          message: 'Your account has sucessfully been created!',
        });
      })
      .catch((error) => {
        return res.status(400).json({
            status: 400,
            error: error,
          });
      })
  }

  
}    
export default userController;

