let express = require("express")
let bodyParser = require("body-parser")
let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let port = 8080
app.use("/api/auth", require("./app/Routes/auth.routes"))
app.listen(port)
console.log(`server running: http://127.0.0.1:${port}`);
