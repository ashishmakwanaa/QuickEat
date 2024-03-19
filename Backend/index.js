const connectToMongo = require("./db.js");
connectToMongo();
const auth = require('./routes/auth.js');
const getData = require('./routes/getData.js');
const update = require('./routes/update.js');
const add = require("./routes/add.js");
const deleted = require('./routes/delete.js');
const checkout = require('./routes/checkout.js');
const express = require("express");


const cors = require("cors");

const app = express();
const port = 4000;


app.use(cors())

app.use(express.json());

app.use("/auth",auth);
app.use("/add",add);
app.use("/getData",getData);
app.use("/update",update)
app.use("/delete",deleted);
app.use("/checkout",checkout)

app.listen(port,(err)=>{
    console.log(`Server Running is on Port ${port}`)
})
