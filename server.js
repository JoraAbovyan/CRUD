
const { ObjectId } = require('mongodb');

const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

const mongoose = require('mongoose');
const { log } = require('console');
const connectionString = 'mongodb+srv://JoraAbovyan:2579931068993584JorJ@cluster0.grfgj58.mongodb.net/Products';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(bodyParser.json({}));
app.use(express.static('public'));


app.get("/", function (req, res) {
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      try {
         let Result = await mongoose.connection.db.collection('Prod').find().toArray()
         res.render('../public/form.ejs', {
            obj: Result
         });
         
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   })
});


app.post("/about", function (req, res) {
   const name = req.body.name;
   const price = req.body.price;
   const img_url = req.body.img_url;
   const description = req.body.description;
   const uuid = req.body.uuid;
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');

      try {
         let result = await mongoose.connection.db.collection('Prod').insertOne({
            name: name,
            price: price,
            image: img_url,
            description: description,
            uuid: uuid

         })
         console.log(result);
         res.json(result);
      } catch (error) {
         console.error('Error retrieveving users', error);
      } finally {
         mongoose.connection.close();
      }

   })

});
app.get("/update/:id", function (req, res) {
   var id = req.params.id;
   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      try {
         let result = await mongoose.connection.db.collection('prod').findOne({ uuid: id });
         res.render('../public/update.ejs', {
            obj: result
         });
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   })
});

app.post("/updateData", function (req, res) {
   const name = req.body.name;
   const price = req.body.price;
   const img_url = req.body.img_url;
   const uuid = req.body.uuid;
   const description = req.body.description;

   mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', async () => {
      console.log('Connected to MongoDB!');
      try {
         let result = await mongoose.connection.db.collection('prod').updateOne({
            $or: {
               name: name,
               price: price,
               image: img_url,
               description: description,
               uuid: uuid
            }
         })
         // res.json(result);
      } catch (error) {
         console.error('Error retrieving movies:', error);
      } finally {
         mongoose.connection.close();
      }
   })
});

app.listen(3000, function () {
   console.log("Example is running on port 3000");
})
