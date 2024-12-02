const express=require('express')
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
app.use(cors(
    {
     origin: 'https://finaleval2-frontend68.onrender.com',
  credentials: true // This allows cookies and HTTP authentication to be sent along with the requests 
    }
));


env.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Updated");
});


  app.use("/api/user",  userRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
});
