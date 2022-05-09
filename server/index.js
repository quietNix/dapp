const express = require('express')
const Gun = require('gun');
const cors = require("cors")
const app = express()
// require("gun-mongo");
app.use(Gun.serve);

app.use(cors());



const port = process.env.PORT || 3030;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

Gun({ 
    // file:false,
    web: server,
    // mongo: "mongodb+srv://admin-nikhil:Nikku123@clusternix.si9ml.mongodb.net/dapp?retryWrites=true&w=majority"
 });