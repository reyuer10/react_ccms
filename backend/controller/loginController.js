const databaseQuery = require("../db/dbQuery");

exports.loginAuth = async (req, res, next) => {
  const queryUsername = `SELECT * FROM tb_user WHERE user_name = ?`;
  const {
    body: { user_name, user_pass },
  } = req;

  try {
    const results = await databaseQuery(queryUsername, [user_name]);
    if (results.length === 0) {
      res.status(404).send({
        error: "user_name",
        message: "Invalid user id",
      });
    } else {
      let user = results[0];
      if (user.user_pass !== user_pass) {
        res.status(404).send({
          error: "user_pass",
          message:
            "Invalid credentials, user id and password do not match. Please try again.",
        });
      } else {
        req.session.user = user;
        const sessionId = req.sessionID;
        console.log("session created: ", req.session);
        res.status(200).send({
          length: results.length,
          message: "Successfully login!",
          sessionId: sessionId,
          data: req.session.user,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ messsage: "Internal Server Error" });
  }
};

exports.addLoginHistory = async (req, res) => {
  const sql =
    "INSERT INTO tb_loginhistory(`login_username`, `login_password`, `login_timestamp`) VALUE(?, ?, NOW())";
  const {
    body: { login_username, login_password },
  } = req;

  try {
    const results = await databaseQuery(sql, [login_username, login_password]);

    res
      .status(200)
      .send({ message: "Successfully added to login history", data: results });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.loginStatus = (req, res) => {
  // const expiredTimeSeconds = new Date().setSeconds(new Date().getSeconds() + 10);
  // const expiredTimeSeconds = new Date().setMinutes(new Date().getMinutes() + 5);

  const expiredTimeSeconds = new Date().setHours(new Date().getHours() + 8);
  if (req.session && req.session.user) {
    res.status(200).json({
      // message: `Welcome, ${req.session.user.login_username}`,
      data: req.session.user,
      isAuthenticated: true,
      expiredAt: expiredTimeSeconds,
    });
  } else {
    res
      .status(403)
      .send({ message: "Unauthorized Access!", isAuthenticated: null });
  }
};

exports.logout = (req, res) => {
  console.log("session data: ", req.session);
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ message: "session error" });
      } else {
        req.session = null;
        res.clearCookie("Nq56l9reygalaxy.");
        // res.clearCookie("connect.sid");
        res.send({
          message: "successfully destroy session!",
          session: req.session,
          isAutheticated: false,
        });
      }
    });
  } else {
    res.status(400).send({ message: "No session found!" });
  }
};

// exports.loginStatus = async (req, res) => {};
