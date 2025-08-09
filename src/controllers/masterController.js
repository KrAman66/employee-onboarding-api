const pool = require("../config/db");

exports.getDepartments = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM departments");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getDesignations = async (req, res) => {
  const department = req.query.department;
  try {
    const result = await pool.query(
      "SELECT id, name FROM designations WHERE department_id = $1",
      [department]
    );
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getEmploymentTypes = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM employment_types");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM roles");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getShifts = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM shifts");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM locations");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM countries");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getStates = async (req, res) => {
  const country = req.query.country;
  try {
    const result = await pool.query(
      "SELECT id, name FROM states WHERE country_id = $1",
      [country]
    );
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};

exports.getBanks = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM banks");
    res.json({
      status: "SUCCESS",
      data: result.rows,
      message: "Fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", message: err.message });
  }
};
