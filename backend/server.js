const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes');
const connectDB = require('./src/config/DBConnection');
connectDB();

const app = express();
const port = process.env.PORT || 9999;

const { FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL, WP_FRONTEND_LOCAL_URL } = process.env;

// ✅ JSON Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", WP_FRONTEND_LOCAL_URL, FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL], // or your production domain'
  credentials: true
}));


app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Server working fine!" })
})


app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
},)
