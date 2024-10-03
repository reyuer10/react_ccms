const db = require("../db/db");
const databaseQuery = require("../db/dbQuery");

exports.getUser = (req, res) => {
  const sql = `SELECT * FROM tb_user order by user_timestamp desc`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Internal Server Error!" });
    }
    return res.status(200).send(data);
  });
};

exports.addUser = async (req, res) => {
  const sql =
    "INSERT INTO tb_user (`user_name`, `user_pass`, `user_fullname`, `user_empid`, `permissions_id`, `user_timestamp`) VALUES(?,?,?,?,?, NOW())";
  const { user_name, user_pass, user_fullname, user_empid, permissions_id } =
    req.body;
  try {
    const results = await databaseQuery(sql, [
      user_name,
      user_pass,
      user_fullname,
      user_empid,
      permissions_id,
    ]);
    return res
      .status(200)
      .send({ message: "Successfully added!", results: results });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.findUser = async (req, res) => {
  const sql = `SELECT * FROM tb_user WHERE user_id = ?`;
  const { user_id } = req.params;

  try {
    const results = await databaseQuery(sql, [user_id]);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.editUser = async (req, res) => {
  const sql =
    "UPDATE tb_user SET user_name = ?, user_pass = ?, user_fullname = ?, user_empid = ?, permissions_id = ? WHERE user_id = ?";
  const { user_id } = req.params;
  const { user_name, user_pass, user_fullname, user_empid, permissions_id } =
    req.body;

  try {
    const results = await databaseQuery(sql, [
      user_name,
      user_pass,
      user_fullname,
      user_empid,
      permissions_id,
      user_id,
    ]);
    return res
      .status(200)
      .send({ message: "Succesfully edit user data", results: results });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.deleteUser = async (req, res) => {
  const sql = "DELETE FROM tb_user WHERE user_id = ?";
  const { user_id } = req.params;
  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Internal Server Error!" });
    }
    return res.status(200).send("Successfully deleted user!");
  });
};

exports.getSytemLogs = async (req, res) => {
  const sql = "SELECT * FROM ccms_db.tb_systemlogs";
  try {
    const response = await databaseQuery(sql);
    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error!" });
  }
};
