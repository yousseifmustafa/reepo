

const express = require("express");
const app = express();
const dotenv = require("dotenv").config()
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const booksRoute = require("./routes/book.routes");
const {  mongoose } = require("mongoose");


mongoose.connect("mongodb+srv://m:root@cluster0.2ezv1.mongodb.net/bockstore?retryWrites=true&w=majority")
    .then(()=> console.log("DB Conected")
    ).catch((err)=>console.error(err))

app.use(express.json())
app.use(cors());

app.use( '/users' ,userRoute )

app.use( '/books' ,booksRoute )

app.use(( err ,req ,res, next) => {
    res.json(err)
})







app.listen( 3001 , ()=>{
    console.log(" listing On Port : 3001 "  )
} )

module.exports = app;  