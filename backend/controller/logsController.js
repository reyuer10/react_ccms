const databaseQuery = require("../db/dbQuery");

// for account login = 'Account Login' DONE
// for creating new location = 'New Location' DONE
// for creating new canister = 'New Canister' DONE
// for creating new group = 'New Group' DONE
// for creating new card color = 'New Card Color'
// for creating new user = 'New User' DONE

exports.systemAddLogs = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`,`logs_timestamp`) VALUE( ?, ?, ?, NOW())";
  const {
    body: { logs_type, logs_desc, logs_performBy },
  } = req;

  try {
    const results = await databaseQuery(sql, [
      logs_type,
      logs_desc,
      logs_performBy,
    ]);
    return res.status(200).send({
      message: "Successfully added to the logs (account login)",
      results: results,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.logsLoginAuth = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`,`logs_timestamp`) VALUE('Account Login', ?, ?, NOW())";
  const {
    body: { logs_desc, logs_performBy },
  } = req;

  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    return res.status(200).send({
      message: "Successfully added to the logs (account login)",
      results: results,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.logsAddLocation = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`,`logs_timestamp`) VALUE('New Location', ?, ?, NOW())";
  const {
    body: { logs_desc, logs_performBy },
  } = req;
  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    res.status(200).send({
      message: "Successfully added to history for update location",
      results: results,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.logsAddCanister = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`, `logs_timestamp`) VALUE('New Canister', ?, ?, NOW())";
  const {
    body: { logs_desc, logs_performBy },
  } = req;
  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.logsAddGroup = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`, `logs_timestamp`) VALUE(`New Group`, ?, ?, NOW())";
  const {
    body: { logs_desc, logs_performBy },
  } = req;
  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.logsCardColor = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`, `logs_timestamp`) VALUE(`New Card Color`, ?, ?, NOW())";
  const {
    body: { logs_desc, logs_performBy },
  } = req;
  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.logsAddUser = async (req, res) => {
  const sql =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`, `logs_performBy`, `logs_timestamp`) VALUE(`New User`, ?, ?, NOW())";
  const {
    body: { loglogs_descs_type, logs_performBy },
  } = req;
  try {
    const results = await databaseQuery(sql, [logs_desc, logs_performBy]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.historyDeleteLocation = async (req, res) => {};
