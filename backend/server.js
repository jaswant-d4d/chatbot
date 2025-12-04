const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes');
const companiesRouter = require("./src/routes/companies")
const connectDB = require('./src/config/DBConnection');
const validateWidgetAccess = require('./src/middleware/validateWidgetAccess');
connectDB();

const app = express();
const port = process.env.PORT || 9999;

const { FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL, NETWORK_URL, WIDGET_LIVE_URL, WP_FRONTEND_LOCAL_URL } = process.env;

// ✅ JSON Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", WP_FRONTEND_LOCAL_URL, FRONTEND_LIVE_URL, NETWORK_URL, WIDGET_LIVE_URL, FRONTEND_LOCAL_URL],
  credentials: true
}));


app.use("/api", routes);

app.use('/api/companies', companiesRouter);


app.get("/", (req, res) => {
  res.json({ message: "Server working fine!" })
})

app.get("/vite.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "public/widget/vite.svg"));
});

app.get("/widget.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "public", "widget.js"));
});

// Serve widget build (iframe UI)
app.use("/widget", express.static(path.join(__dirname, "public/widget")));
app.use("/assets", express.static(path.join(__dirname, "public/widget/assets")));
app.use("/images", express.static(path.join(__dirname, "public/widget/images")));

app.get("/widget", validateWidgetAccess, (req, res) => {

  res.send({ body: req.body })
  // res.sendFile(path.join(__dirname, "public/widget/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
},)
