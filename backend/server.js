const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes');
const path = require('path');
const connectDB = require('./src/config/DBConnection');
const validateWidgetAccess = require('./src/middleware/validateWidgetAccess');
connectDB();

const app = express();
const port = process.env.PORT || 9999;

const { FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL, WIDGET_LIVE_URL, WP_FRONTEND_LOCAL_URL } = process.env;

// ✅ JSON Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", WP_FRONTEND_LOCAL_URL, FRONTEND_LIVE_URL, WIDGET_LIVE_URL, FRONTEND_LOCAL_URL],
  credentials: true
}));


app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Server working fine!" })
})
app.get("/widget", validateWidgetAccess, (req, res) => {
  // If you are using React and built files are in 'build' or 'dist',
  // you can serve an HTML that bootstraps your chat iframe UI.
  // For dev/simple example, serve an HTML file from public/widget.html
  res.sendFile(path.join(__dirname, "public", "widget.html"));
});
// static files (widget.js) and UI assets in public
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
},)
