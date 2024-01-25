
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

const connectionString = 'mongodb+srv://JoraAbovyan:2579931068993584JorJ@cluster0.grfgj58.mongodb.net/sample_mflix';

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({extended: true}));

app.use(express.static('public'));

app.get("/", function(req, res){
   res.sendFile(path.join(__dirname,'./public/form.html'));
});

app.post("/about", function(req, res){
   let  surname = req.body.name;
   let email = req.body.email;
   let password = req.body.password;
   mongoose.connect(connectionString, { useNewUrlParser: true ,useUnifiedTopology: true });

      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error:'));
      db.once('open', async () => {
      console.log('Connected to MongoDB!');

try{
   

   const User = await mongoose.connection.db.collection('users').insertOne({
      name: surname,
      email: email,
      password: password
   })
   console.log(User);
   // res.json(User);
} catch (error) {
   console.error('Error retrieveving movies', error);
} finally {
   mongoose.connection.close();
}

})
 
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
})


