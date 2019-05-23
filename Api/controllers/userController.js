import users from '../models/users.js';
const jwt = require ('jsonwebtoken');
const Joi = require('joi');// instantiate validator class Joi

// Pick Method to display required object properties
const pick = (obj, prop) => {
  if (!obj || !prop) return;
  const resObject = {};
  prop.forEach((prop)=> {
  resObject[prop] = obj[prop];
  });
  return resObject;
}
class UserController {
  // Post a new user
  static createUser(req, res) {
    // Check if user exists
    const user = users.find(
      existingUser => existingUser.email === req.body.email,
    );
    if (user) {
      return res.status(409).json({
        status: 409,
        error: 'CONFLICT EXISTS',
        message: 'user email already exists'
      });
    }

    const token = jwt.sign(
      {requestBody: req.body,}, process.env.JWT_KEY, {expiresIn: "24h"}
    );
    const newUser = {
      token: token,
      id : users.length + 1 ,      
      firstName : req.body.firstName ,
      lastName : req.body.lastName ,
      email : req.body.email ,
      password : req.body.password ,
      address : req.body.address ,
      status : 'unverified' , // unverified or verified
      isAdmin : false ,
    };
    users.push(newUser);
    return res.status(201).json({
      status: 201,
      data: pick (newUser, ['token', 'id', 'firstName', 'lastName', 'email']),
      message: 'Your account has sucessfully been created!',
    });
  }
  static userLogin (req, res) {
    const user = users.find(user1 => user1.email === req.body.email);
    if (user){
    if (req.body.email === user.email && req.body.password === user.password){
      return res.status(200).json(
        {
          status: 200,
          data: pick (user, ['token', 'id', 'firstName', 'lastName', 'email']),
          message: "Login successful",
        }
      )};
    };
    // if error
      return res.status(401).json({
          status: 401,
          error: 'AUTHENTICATION FAILED',
          message: "incorrect email or password",
        }); 
  }

  // Verify User
  // Mark a user as verified
  static verifyUser (req,res){
    const findUser = users.find(user => user.email === req.params.useremail);
    if (findUser){
      findUser.status = req.body.status;
      res.status(200).json({
        data: pick (findUser, ['email', 'firstName', 'lastName', 'password', 'address', 'status']),
        message: 'user status has been updated to ' + findUser.status,
      });
    };
    return res.status(404).json({
      status: 404,
      error: 'NOT FOUND',
      message: 'user record not found',
    });
  }
  
}    
export default UserController;

