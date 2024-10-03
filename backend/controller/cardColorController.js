const db = require("../db/db");
const databaseQuery = require("../db/dbQuery");

exports.getCardColor = async (req, res) => {
  const sql = "SELECT * FROM tb_cardcolor order by cardcolor_timestamp desc";
  try {
    const results = await databaseQuery(sql);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.findCardColor = async (req, res) => {
  const sql = `SELECT * FROM tb_cardcolor WHERE cardcolor_ID = ?`;
  const { cardcolor_ID } = req.params;

  try {
    const results = await databaseQuery(sql, [cardcolor_ID]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error." });
  }
};

exports.addCardColor = async (req, res) => {
  const sql =
    "INSERT INTO tb_cardcolor(`cardcolor_name`, `cardcolor_timestamp`) VALUE(?, NOW())";
  const { cardcolor_name } = req.body;
  try {
    const results = await databaseQuery(sql, [cardcolor_name]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.updateCardColor = async (req, res) => {
  const sql =
    "UPDATE tb_cardcolor SET cardcolor_name = ? WHERE cardcolor_ID = ?";
  const { cardcolor_name, cardcolor_ID } = req.body;

  try {
    await databaseQuery(sql, [cardcolor_name, cardcolor_ID]);
    return res.status(200).send({
      message: `Card color id ${cardcolor_ID} has been Succesfully updated!`,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.deleteCardColor = async (req, res) => {
  const sql = "DELETE FROM tb_cardcolor WHERE cardcolor_ID = ?";
  const { cardcolor_ID } = req.params;
  try {
    const results = await databaseQuery(sql, [cardcolor_ID]);
    return res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};
