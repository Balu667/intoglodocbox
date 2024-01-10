const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const documentRouter = require('./routes/documents');
const clerkClient = require('@clerk/clerk-sdk-node');
const userRouter = require('./routes/user');
const docBoxRouter = require('./routes/docBox');
require("dotenv").config()
const cors = require('cors')
// clerkClient.users.getUserList().then(data=> {
//     data.forEach((user)=> console.log(user))
// });

// const clerk = new clerk.Client({
//     clientId: "pk_test_bWFnaWNhbC1hcGhpZC0zNi5jbGVyay5hY2NvdW50cy5kZXYk",
//     clientSecret: "sk_test_ZczMFL1LEczCIevinUHg6de2Ym9QSuxhaItrtIGZhn",
// });

// app.post('http://192.168.59.166:3001/clerk/webhooks', async (req, res) => {
//     try {
//         console.log("sadfsadf")
//         await clerk.webhooks.handle(req, res);

//         if (req.body.event === 'user.created') {
//             const userData = req.body.user;

//             // Connect to MongoDB and store user data (replace placeholders)
//             const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//             await client.connect();
//             const db = client.db("your_database_name");
//             const usersCollection = db.collection("users");
//             await usersCollection.insertOne(userData);
//             console.log("User data stored successfully");
//         }
//     } catch (error) {
//         console.error("Error handling Clerk webhook:", error);
//         res.status(500).send("Internal server error");
//     }
// });


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