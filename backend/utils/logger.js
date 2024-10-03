const fs = require("fs");
const outputLog = fs.WriteStream("./outputLog.log");
const errorsLog = fs.createWriteStream("./errorsLog.log");

const consoler = new console.Console(outputLog, errorsLog);

setInterval(() => {
  consoler.log(new Date());
  consoler.error(new Error("New error"));
}, 10000);
