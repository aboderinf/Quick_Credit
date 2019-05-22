const jwt = require ('jsonwebtoken');
import userModel from '../database/users-db';
import bcrypt from 'bcryptjs';

class userController {
  // Post a new user
  static createUser(req, res) {
    userModel.create(req.body)
      .then(({ rows }) => {
        return res.status(201).json({
          status: 201,
          data: {
            ...rows[0],
            token: jwt.sign({
              id: rows[0].id,
            }, process.env.JWT_KEY)
          },
          message: 'Your account has sucessfully been created!',
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(400).json({
            status: 400,
            error: error,
          });
      })
  }
  static userLogin (req, res) {
    const {email} = req.body;
    userModel.findByEmail(email)
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'Invalid email address or password',
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        return res.status(200).json({
          status: 200,
          message: 'Login successful',
          data: {
            ...user,
            token,
          },
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Incorrect login details',
      });
    }).catch( error => res.status(401).json({
      status: 404,
      error: 'NOT FOUND',
    }));
 }
    // Verify User
  // Mark a user as verified
  static verifyUser (req,res){
    const {useremail} = req.params;
    userModel.findByEmail(useremail)
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({
        
          status: 404,
          error: 'NOT FOUND',
          message: 'user record not found',
        });
      }
      userModel.verifyUser(useremail);
      result.rows[0].status = 'verified';
      res.status(200).json({
        status: 200,
        message: 'user status has been updated to ' + user.status,
      });
  });
  }
  
}    
export default userController;

