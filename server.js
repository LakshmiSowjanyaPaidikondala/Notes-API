const express = require("express");
const app = express();

const connection = require("./config/db");

app.use(express.json());

const notesRoutes = require("./routes/notesRoutes");

app.use("/notes",notesRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to Notes API")
});


app.listen(3000, ()=>{
    console.log("Server is running successfully on 3000 port");
})