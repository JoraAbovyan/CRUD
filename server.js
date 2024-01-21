// // const { log } = require("console");
// const express = require("express");
// const bodyParser = require("body-parser");
// var path = require("path");
// const app = express();

// app.use(bodyParser.urlencoded({extended: true}));

// app.use(bodyParser.json({extended: true}));

// app.use(express.static('public'));

// app.get("/", function(req, res){
//    res.sendFile(path.join(__dirname,'./public/form.html'));
// });

// app.post("/about", function(req, res){
//    let  name = req.body.name;
//    let age = req.body.age;
//    console.log(name, age);
//    res.redirect('/');
// });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// })

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const connectionString = 'mongodb+srv://JoraAbovyan:2579931068993584JorJ@cluster0.grfgj58.mongodb.net/sample_mflix';


// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true ,useUnifiedTopology: true });

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
console.log('Connected to MongoDB!');

try{
   const allSessions = await mongoose.connection.db.collection('sessions').find().toArray();

   await mongoose.connection.db.collection('sessions').insertOne({
     
      user_id: "1",
      name: 'popoq'

   })

   console.log("all sessions", allSessions);
} catch (error) {
   console.error('Error retrieveving sessions', error);
} finally {
   mongoose.connection.close();
}

});