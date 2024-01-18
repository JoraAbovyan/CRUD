// const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({extended: true}));

app.use(express.static('public'));

app.get("/", function(req, res){
   res.sendFile(path.join(__dirname,'./public/form.html'));
});

app.post("/about", function(req, res){
   let  surname = req.body.surname;
   let age = req.body.age;
   console.log(surname, age);
   res.redirect('/');
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
})
