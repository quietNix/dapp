const express = require('express')
const Gun = require('gun');
const cors = require("cors")
const app = express()
const port = 3030
app.use(Gun.serve);

app.use(cors());

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

Gun({ web: server });