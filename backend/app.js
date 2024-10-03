// library
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let session = require("express-session");
let MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();
let cookieParser = require("cookie-parser");
const loggerMiddleware = require("./utils/loggerMiddleware");

// routes
let canisterRoutes = require("./routes/canisterRoutes");
let locationRoutes = require("./routes/locationRoutes");
let groupRoutes = require("./routes/groupRoutes");
let userRoutes = require("./routes/userRoutes");
let loginRoutes = require("./routes/loginRoutes");
let cardColorRoutes = require("./routes/cardColorRoutes");
let logsRoutes = require("./routes/logsRoutes");

const sessionStore = new MySQLStore({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// use
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(
  session({
    key: "Nq56l9reygalaxy.",
    secret: "itStaffReyuer!!$$",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
      maxAge: 5000,
      secure: false,
      httpOnly: false,
    },
  })
);

app.use(loggerMiddleware);

app.use("/canisterApi", canisterRoutes);
app.use("/locationApi", locationRoutes);
app.use("/groupApi", groupRoutes);
app.use("/userApi", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/cardColor", cardColorRoutes);
app.use("/api/logs/", logsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
