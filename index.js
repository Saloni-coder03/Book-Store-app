const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const{jwtAuthMiddleWare,generateToken} = require('./jwt.js');

//import mongoose
const mongoose = require('mongoose');
//import router
const bookroutes = require('./router/bookroutes.js');
const personRoutes = require('./router/personRoutes.js');

//for important files i.e. crucial information
require('dotenv').config();

const PORT = process.env.PORT || 4000 ;
const MONGODB_URL = process.env.MONGODB_URL;

//connect to mongoDB server
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});


//router use
app.use('/book',bookroutes);
app.use('/person',personRoutes);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})
