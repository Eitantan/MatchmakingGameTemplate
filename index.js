const express = require('express');
const bodyParser = require("body-parser")
const { encrypt } = require("./encrypt.js")
const Database = require("replpersist")

const peeps = new Database("peeps")
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", (req, res)=>{
	peeps.data[req.body.username] = req.body.password.encrypt(process.env['SECRET_ENCRYPTION_KEY'])
})

app.post("/login", (req, res)=>{
	if(peeps.data[req.body.username] == req.body.password.encrypt(process.env['SECRET_ENCRYPTION_KEY'])){
		res.send("Logged in!")
	}else{
		res.send("Incorrect username or password!")
	}
})

app.listen(8080, function() {
  console.log('Example app listening on port 3000!');
});