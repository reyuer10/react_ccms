const db = require("../db/db");
const databaseQuery = require("../db/dbQuery");

exports.getLocation = async (req, res) => {
  const sql = `SELECT l.loc_ID, l.loc_name, l.loc_desc, l.grp_ID, g.grp_name, l.loc_timestamp FROM tb_location as l INNER JOIN tb_group as g on l.grp_ID = g.grp_ID order by l.loc_timestamp desc`;

  try {
    const results = await databaseQuery(sql);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.addLocation = async (req, res) => {
  const locNameQuery = "SELECT * FROM tb_location WHERE loc_name = ?";
  const grpNameQuery = "SELECT grp_ID FROM tb_group WHERE grp_name = ?";
  const sql =
    "INSERT INTO tb_location(`loc_name`, `loc_desc`, `grp_ID`, `loc_timestamp`) VALUE(?, ?, ?, NOW())";
  const { loc_name, loc_desc, grp_name } = req.body;

  if (!grp_name || !loc_desc || !grp_name) {
    return res.status(400).send({
      type: "error",
      name: "groupName",
      message: "Group is required",
    });
  }

  try {
    const grpNameResults = await databaseQuery(grpNameQuery, [grp_name]);
    let g = grpNameResults[0];

    if (grpNameResults.length === 0) {
      // Changed to check if results are empty
      return res.status(400).send({
        name: "groupName",
        message: `Invalid group`,
      });
    }

    const locNameResults = await databaseQuery(locNameQuery, [loc_name]);
    if (locNameResults.length > 0) {
      return res.status(400).send({
        name: "locationName",
        message: `The location ${loc_name} already exist`,
      });
    }

    const results = await databaseQuery(sql, [loc_name, loc_desc, g.grp_ID]);
    return res.status(200).send({
      message: "Successfully added location",
      results: results,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateLocation = async (req, res) => {
  const sql =
    "UPDATE tb_location SET loc_name = ?, loc_desc = ?, grp_ID = ? WHERE loc_ID = ?";
  const { loc_name, loc_desc, loc_ID } = req.body;

  const sqlGroupName = "SELECT grp_ID FROM tb_group WHERE grp_name = ?";
  const {
    body: { grp_name },
  } = req;

  const sqlLogs = `INSERT INTO tb_systemlogs(\`logs_type\`, \`logs_desc\`, \`logs_valueID\`, \`logs_performBy\`, \`logs_timestamp\`) VALUE(?, ?, ?, ?, NOW())`;
  const {
    body: { logs_type, logs_desc, logs_valueID, logs_performBy },
  } = req;

  if (!grp_name) {
    return res.status(400).send({
      type: "error",
      name: "editGrp_name",
      message: "Group cannot be empty",
    });
  }

  try {
    const grpNameResults = await databaseQuery(sqlGroupName, [grp_name]);

    if (grpNameResults.length === 0) {
      return res.status(400).send({
        type: "error",
        name: "editGrp_name",
        message: "Invalid group",
      });
    }

    const g = grpNameResults[0];
    let grp_ID = g.grp_ID;
    const results = await databaseQuery(sql, [
      loc_name,
      loc_desc,
      grp_ID,
      loc_ID,
    ]);

    if (results) {
      return res
        .status(200)
        .send({ message: "Succesfully updated!", results: results });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteLocation = (req, res) => {
  const sql = "DELETE FROM tb_location WHERE loc_ID = ?";
  const { loc_ID } = req.params;

  db.query(sql, [loc_ID], (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
    return res.status(200).send({ message: "Succesfully deleted location!" });
  });
};
