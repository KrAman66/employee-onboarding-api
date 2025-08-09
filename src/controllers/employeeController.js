const pool = require("../config/db");
const { employeeSchema } = require("../utils/validators");

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { error, value } = employeeSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "FAILURE", message: error.message });

    // Check unique Aadhaar
    const aadhaarCheck = await pool.query(
      "SELECT * FROM employees WHERE aadhaar_number = $1",
      [value.aadhaar_number]
    );
    if (aadhaarCheck.rows.length)
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Aadhaar already exists" });

    // Check unique PAN
    const panCheck = await pool.query(
      "SELECT * FROM employees WHERE pan_number = $1",
      [value.pan_number]
    );
    if (panCheck.rows.length)
      return res
        .status(400)
        .json({ status: "FAILURE", message: "PAN already exists" });

    // Check IFSC + Account Number unique
    const ifscAccCheck = await pool.query(
      "SELECT * FROM employees WHERE ifsc_code = $1 AND account_number = $2",
      [value.ifsc_code, value.account_number]
    );
    if (ifscAccCheck.rows.length)
      return res
        .status(400)
        .json({
          status: "FAILURE",
          message: "Bank account already exists for this IFSC",
        });

    const result = await pool.query(
      `INSERT INTO employees (
        first_name, last_name, dob, gender, email, mobile_number, department_id,
        designation_id, employment_type_id, joining_date, location_id,
        preferred_shift_id, role_id, reporting_manager_id,
        address_line1, address_line2, country_id, state_id, city, pincode,
        pan_number, aadhaar_number, bank_id, account_number, ifsc_code
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,
        $12,$13,$14,
        $15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25
      ) RETURNING employee_id`,
      [
        value.first_name,
        value.last_name,
        value.dob,
        value.gender,
        value.email,
        value.mobile_number,
        value.department_id,
        value.designation_id,
        value.employment_type_id,
        value.joining_date,
        value.location_id,
        value.preferred_shift_id || null,
        value.role_id,
        value.reporting_manager_id || null,
        value.address_line1,
        value.address_line2 || null,
        value.country_id,
        value.state_id,
        value.city,
        value.pincode,
        value.pan_number,
        value.aadhaar_number,
        value.bank_id,
        value.account_number,
        value.ifsc_code,
      ]
    );

    res.json({
      status: "SUCCESS",
      message: "Employee created successfully",
      data: { employeeId: result.rows[0].employee_id },
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [req.params.id]
    );
    if (!result.rows.length)
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Employee not found" });
    res.json({
      status: "SUCCESS",
      data: result.rows[0],
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { error, value } = employeeSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "FAILURE", message: error.message });

    const result = await pool.query(
      `UPDATE employees SET
        first_name=$1, last_name=$2, dob=$3, gender=$4, email=$5, mobile_number=$6,
        department_id=$7, designation_id=$8, employment_type_id=$9, joining_date=$10, location_id=$11,
        preferred_shift_id=$12, role_id=$13, reporting_manager_id=$14,
        address_line1=$15, address_line2=$16, country_id=$17, state_id=$18, city=$19, pincode=$20,
        pan_number=$21, aadhaar_number=$22, bank_id=$23, account_number=$24, ifsc_code=$25,
        updated_at=NOW()
      WHERE employee_id=$26 RETURNING employee_id`,
      [
        value.first_name,
        value.last_name,
        value.dob,
        value.gender,
        value.email,
        value.mobile_number,
        value.department_id,
        value.designation_id,
        value.employment_type_id,
        value.joining_date,
        value.location_id,
        value.preferred_shift_id || null,
        value.role_id,
        value.reporting_manager_id || null,
        value.address_line1,
        value.address_line2 || null,
        value.country_id,
        value.state_id,
        value.city,
        value.pincode,
        value.pan_number,
        value.aadhaar_number,
        value.bank_id,
        value.account_number,
        value.ifsc_code,
        req.params.id,
      ]
    );

    if (!result.rows.length)
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Employee not found" });

    res.json({ status: "SUCCESS", message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE employee_id = $1 RETURNING employee_id",
      [req.params.id]
    );
    if (!result.rows.length)
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Employee not found" });
    res.json({ status: "SUCCESS", message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};
