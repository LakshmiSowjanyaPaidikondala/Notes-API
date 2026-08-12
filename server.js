const express = require("express");
const app = express();

const connection = require("./config/db");

app.use(express.json());

const notesRoutes = require("./routes/notesRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use("/notes",notesRoutes);
app.use("/users",userRoutes);
app.use(errorHandler);

app.get("/",(req,res)=>{
    res.send("Welcome to Notes API")
});


app.listen(3000, ()=>{
    console.log("Server is running successfully on 3000 port");
})