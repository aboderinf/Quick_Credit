const Joi = require('joi');
// instantiate validator class Joi
const userSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
};
const loanSchema = {
  user: Joi.string().required(),
  tenor: Joi.number().integer().min(1).max(12)
    .required(),
  amount: Joi.number().required(),
};
const repaymentSchema = {
  paidAmount: Joi.number().positive().required(),
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

  static loanValidator(req, res, next) {
    const result = Joi.validate(req.body, loanSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.details,
      });
    }
    next();
  }

  static repaymentValidator(req, res, next) {
    const result = Joi.validate(req.body, repaymentSchema, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.details,
        message: 'Invalid input',
      });
    }
    next();
  }
}
export default Validation;
