
const { ObjectId } = require('mongodb');

const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://JoraAbovyan:2579931068993584JorJ@cluster0.grfgj58.mongodb.net/Tumo_products';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(bodyParser.json({}));

app.use(express.static('public'));

app.get("/list", function (req, res) {
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      try {

         console.log('Connected to MongoDB!');
         let find = await mongoose.connection.db.collection('theaters').find({ 'location.address.city': 'Bloomington' }).toArray()
         res.render('../public/form.ejs', {
            obj: find
         })
      } catch (error) {
         console.error('Error retrieveving users', error);
      } finally {
         mongoose.connection.close();
      }
   })
});
app.get("/", function (req, res) {
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   const BooksSchema = new Schema ({
      title : String,
      author : String,
      price : Number
     });
     const Books = mongoose.model('Books', BooksSchema)


   db.once('open', async () => {
   try{
      let Prod = await mongoose.connection.db.collection('Tumo_products').insertMany([
         {title : "War and Peace", author: "Leo Tolstoy", price: "13$"},
         {title : "War and Peace", author: "Leo Tolstoy", price: "13$"},
         {title : "War and Peace", author: "Leo Tolstoy", price: "13$"}
      ])



   } catch (error) {
      console.error('Error retrieveving Products', error);
   }  finally  {
      mongoose.connection.close();
   }   

   });

   app.post("/about", function (req, res) {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error:'));
      db.once('open', async () => {
         console.log('Connected to MongoDB!');

         try {
            // let find = await mongoose.connection.db.collection('teathers').find({ 'location.address.city': 'Bloomington' }).toArray()
            let User = await mongoose.connection.db.collection('users').insertOne({
               name: name,
               email: email,
               password: password
            })

            // res.json(User);
         } catch (error) {
            console.error('Error retrieveving users', error);
         } finally {
            mongoose.connection.close();
         }

      })

   });

   app.listen(3000, function () {
      console.log("Example is running on port 3000");
   })


