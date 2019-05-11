import users from '../models/users.js';
const jwt = require ('jsonwebtoken');
const Joi = require('joi');// instantiate validator class Joi

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
        error: 'user already exists',
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
      data: {
        token: token,
        id : newUser.id ,      
        firstName : req.body.firstName ,
        lastName : req.body.lastName ,
        email : req.body.email ,
      },
      message: 'Your account has sucessfully been created!',
    });
  }
  static userLogin (req, res) {
    const user = users.find(user1 => user1.email === req.body.email);
    if (user){
    if (req.body.email === user.email && req.body.password === user.password){
      const data = Object.keys(user).reduce((object, key) =>{
        if (key != 'isAdmin' || key != 'password' || key != 'address' || key != 'status' ){
          object[key] = user[key]
        }
        return object;
      },{})
      return res.status(200).json(
        {
          status: 200,
          data: data,
          message: "Login successful",
        }
      )};
    };
    // if error
      return res.status(401).json({
          status: 401,
          message: "incorrect email or password",
        }); 
  }

}    
export default UserController;

