// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import userModel from '../database/users-db';

const jwt = require('jsonwebtoken');

class userController {
  // Post a new user
  static createUser(req, res) {
    userModel.create(req.body)
      .then(({ rows }) => {
        // eslint-disable-next-line no-param-reassign
        delete (rows[0].password);
        const user = rows[0];
        const token = jwt.sign(req.body, process.env.JWT_KEY);
        return res.status(201).json({
          status: 201,
          data: {
            token,
            user,
          },
          message: 'Your account has sucessfully been created!',
        });
      })
      .catch(error => res.status(400).json({
        status: 400,
        error,
      }));
  }

  static userLogin(req, res) {
    const { email } = req.body;
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
          const token = jwt.sign(user, process.env.JWT_KEY);
          console.log(user)
          return res.status(200).json({
            status: 200,
            message: 'Login successful',
            data: {
              token,
              user,
            },
          });
        }
        return res.status(401).json({
          status: 401,
          error: 'Incorrect login details',
        });
      }).catch(error => res.status(401).json({
        status: 404,
        error,
      }));
  }

  // Verify User
  // Mark a user as verified
  static verifyUser(req, res) {
    const { useremail } = req.params;
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
        // eslint-disable-next-line no-param-reassign
        result.rows[0].status = 'verified';
        return res.status(200).json({
          status: 200,
          message: `user status has been updated to ${user.status}`,
        });
      });
  }
}
export default userController;
