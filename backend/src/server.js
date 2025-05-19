const express = require('express');
const dotenv = require('dotenv').config();
const routes = require('./routes')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8888;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'] // or your production domain
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.get("/", (req, res) => {
    res.json({ message: "hello world!" })
})

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
},)