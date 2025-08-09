const Joi = require("joi");

// Joi schema for employee validation (SRS rules applied)
const employeeSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  dob: Joi.date()
    .less("now")
    .required()
    .custom((value, helpers) => {
      const age = new Date().getFullYear() - value.getFullYear();
      if (age < 18)
        return helpers.message("Employee must be at least 18 years old");
      return value;
    }),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  mobile_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  department_id: Joi.string().required(),
  designation_id: Joi.string().required(),
  employment_type_id: Joi.string().required(),
  joining_date: Joi.date().min("now").required(),
  location_id: Joi.string().required(),
  preferred_shift_id: Joi.string().allow(null, ""),
  role_id: Joi.string().required(),
  reporting_manager_id: Joi.number().allow(null),

  address_line1: Joi.string().required(),
  address_line2: Joi.string().allow(null, ""),
  country_id: Joi.string().required(),
  state_id: Joi.string().required(),
  city: Joi.string().required(),
  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
  pan_number: Joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required(),
  aadhaar_number: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .required(),
  bank_id: Joi.string().required(),
  account_number: Joi.string()
    .pattern(/^[0-9]{9,18}$/)
    .required(),
  ifsc_code: Joi.string()
    .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .required(),
});

module.exports = { employeeSchema };
