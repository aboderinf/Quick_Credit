const Joi = require('joi');
// instantiate validator class Joi
const userSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
};
class Validation {
  static userValidator(req, res, next) {
    const result = Joi.validate(req.body, userSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.details,
      });
    }
    next();
  }  
}
export default Validation;

