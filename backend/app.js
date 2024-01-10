const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const documentRouter = require('./routes/documents');
const clerkClient = require('@clerk/clerk-sdk-node');
const userRouter = require('./routes/user');
const docBoxRouter = require('./routes/docBox');
require("dotenv").config()
const cors = require('cors')
const app = express()
app.use(cors({ origin: "*" }))

app.use(express.json())
app.use(multer().any())
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Mongo connected successfully"))
    .catch((err) => console.log(err))
app.use("/", documentRouter, userRouter)
app.use("/", docBoxRouter)
app.use("/", documentRouter)


app.listen(process.env.PORT, () => {
    console.log(`Node started at port ${process.env.PORT}`);
});