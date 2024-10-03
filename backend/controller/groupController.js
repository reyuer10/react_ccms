const databaseQuery = require("../db/dbQuery");
const db = require("../db/db");

exports.getGroup = async (req, res) => {
  const sql = "SELECT * FROM tb_group order by grp_timestamp desc";
  try {
    const results = await databaseQuery(sql);
    return res.send(results);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.addGroup = async (req, res) => {
  const sql = "INSERT INTO tb_group (`grp_name`, `grp_desc`, `grp_timestamp`) VALUE( ?, ?, NOW())";
  const { grp_name, grp_desc } = req.body;

  try {
    const results = await databaseQuery(sql, [grp_name, grp_desc]);
    return res.send(results);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.updateGroup = async (req, res) => {
  const sql =
    "UPDATE ccms_db.tb_group SET grp_name = ?, grp_desc = ? WHERE grp_ID = ?";

  const { grp_name, grp_desc, grp_ID } = req.body;

  try {
    const results = await databaseQuery(sql, [grp_name, grp_desc, grp_ID]);
    return res.send(results);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteGroup = async (req, res) => {
  const sql = "DELETE FROM tb_group WHERE grp_ID = ?";
  const { grp_ID } = req.params;

  try {
    const results = await databaseQuery(sql, [grp_ID]);
    return res.send(results);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
