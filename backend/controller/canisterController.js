const db = require("../db/db");
// const databaseQuery = require("../db/dbQuery");
const databaseQuery = require("../db/dbQuery");

// 404 = NOT FOUND;

exports.getCanister = async (req, res) => {
  const sql = `SELECT * FROM tb_canister order by canister_timestamp desc`;
  try {
    const data = await databaseQuery(sql);
    return res.status(200).send(data);
  } catch (error) {
    console.log("Error executing query", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.findCanister = async (req, res, next) => {
  const sql = `SELECT * FROM ccms_db.tb_canister where canister_ID = ?`;

  const { canister_ID } = req.params;

  try {
    const results = await databaseQuery(sql, canister_ID);
    if (results.length === 0) {
      // console.log(`id ${canister_ID} is not found!`);
      const error = new Error(`canister id ${canister_ID} is not found!`);
      error.status = 404;
      return next(error);
    }
    res.send(results);
  } catch (error) {
    console.log("Error executing query", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.postCanister = async (req, res, next) => {
  const queryCheckCanister = `SELECT * FROM tb_canister WHERE canister_num = ?`;

  const sql =
    "INSERT INTO tb_canister (`canister_num`, `canister_code`, `canister_desc`, `canister_timestamp`) VALUE(?, ?, ?, NOW())";
  const { canister_num, canister_code, canister_desc } = req.body;

  try {
    const resCanisterQuery = await databaseQuery(queryCheckCanister, [
      canister_num,
    ]);

    if (resCanisterQuery.length > 0) {
      return res.status(400).send({
        message: `Canister number ${canister_num} already exist.`,
      });
    }

    const data = await databaseQuery(sql, [
      canister_num,
      canister_code,
      canister_desc,
    ]);

    if (!canister_num) {
      const error = new Error("Canister number is required!");
      error.status = 404;
      return next(error);
    } else if (!canister_code) {
      const error = new Error("Canister code is required!");
      error.status = 404;
      return next(error);
    } else if (!canister_desc) {
      const error = new Error("Canister description is required!");
      error.status = 404;
      return next(error);
    }
    return res.status(200).send({ message: "Successfully added!", data: data });
  } catch (error) {
    console.log("Error executing query", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.putCanister = async (req, res) => {
  const sqlGetAllCanister = "SELECT canister_num FROM tb_canister";
  const sql =
    "UPDATE tb_canister SET canister_num = ?, canister_code = ?, canister_desc = ?, canister_timestamp = NOW() WHERE canister_ID = ? ";
  const findCanisterId = "SELECT * FROM tb_canister WHERE canister_ID = ?";
  const InsertQueryFromSystemLogs =
    "INSERT INTO tb_systemlogs(`logs_type`, `logs_desc`,`logs_valueID`, `logs_performBy`, `logs_timestamp`) VALUE('Edit Canister', ?, ?, ?, NOW())";
  const findCanisterById = "SELECT * FROM tb_canister WHERE canister_ID = ?";
  const InsertEditSuccessLog = `INSERT INTO tb_systemlogs(\`logs_type\`, \`logs_desc\`,\`logs_valueID\`,\`logs_valueFrom\`, \`logs_valueTo\`,  \`logs_performBy\`, \`logs_timestamp\`) VALUE('Edit Canister', ?, ?, ?, ?, ?, NOW())`;
  // for canister
  const {
    body: { canister_num, canister_code, canister_desc, canister_ID },
  } = req;

  // for systemlogs
  const {
    body: { logs_desc, logs_performBy },
  } = req;

  try {
    // get the id first to give the value already to the previous value:
    const a = await databaseQuery(findCanisterById, [canister_ID]);
    let b = a[0];
    let cnstr_ID = b.canister_ID;
    console.log(b.canister_num);

    // fetch canister results first
    const canisterResults = await databaseQuery(findCanisterId, [canister_ID]);

    // fetch all canister num
    const canisterNumResults = await databaseQuery(sqlGetAllCanister);
    let c = canisterResults[0];

    // I input my canister(canister_num) and in all of the canister num
    let findCanisterNum = canisterNumResults.findIndex(
      (n) => n.canister_num === canister_num
    );

    // FOR SYSTEM DETECTS
    if (
      c.canister_code === canister_code &&
      c.canister_num === canister_num &&
      c.canister_desc === canister_desc
    ) {
      const systemLogsQuery = await databaseQuery(InsertQueryFromSystemLogs, [
        logs_desc,
        b.canister_ID,
        logs_performBy,
      ]);

      return res.status(200).send({ message: "data", data: systemLogsQuery });
    }

    // canister is unique / not found
    if (findCanisterNum >= 0) {
      return res.status(400).send({
        error: true,
        errMessage: `Canister ${canister_num} is already exist`,
      });
    }

    const results = await databaseQuery(sql, [
      canister_num,
      canister_code,
      canister_desc,
      canister_ID,
    ]);

    const logsValObj = {
      logsDescValue: `Successfully update canister ${canister_ID} with the new value.`,
      logsValueID: b.canister_ID,
      logsValueFrom: `${b.canister_num}, ${b.canister_code}, ${b.canister_desc}`,
      logsValueTo: `${canister_num}, ${canister_code}, ${canister_desc}`,
      logsPerformBy: logs_performBy,
    };

    const {
      logsDescValue,
      logsValueID,
      logsValueFrom,
      logsValueTo,
      logsPerformBy,
    } = logsValObj;

    if (results) {
      await databaseQuery(InsertEditSuccessLog, [
        logsDescValue,
        logsValueID,
        logsValueFrom,
        logsValueTo,
        logsPerformBy,
      ]);
      return res.status(200).send(results);
    }
  } catch (error) {
    console.log("Error executing query", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteCanister = async (req, res) => {
  const sql = "DELETE FROM tb_canister WHERE canister_ID = ?";
  const { canister_ID } = req.params;

  try {
    const results = await databaseQuery(sql, canister_ID);
    return res.status(200).send(results);
  } catch (error) {
    console.log("Error executing query", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
