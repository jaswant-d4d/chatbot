const express = require('express');

require('dotenv').config();
const routes = require('./src/routes')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8888;

const { FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL, WP_FRONTEND_LOCAL_URL } = process.env;

app.use(cors({
  origin: ["http://localhost:5173", WP_FRONTEND_LOCAL_URL, FRONTEND_LIVE_URL, FRONTEND_LOCAL_URL] // or your production domain
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Server working fine!" })
})

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
},)