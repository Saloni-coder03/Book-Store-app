const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const{jwtAuthMiddleWare,generateToken} = require('./jwt.js');

//import mongoose
const mongoose = require('mongoose');
//import router
const bookroutes = require('./router/bookroutes.js');
const userRoutes = require('./router/personRoutes.js');

//for important files i.e. crucial information
require('dotenv').config();

const PORT = process.env.PORT || 4000 ;
const MONGODB_URL = process.env.MONGODB_URL;

//connect to mongoDB server
try{
mongoose.connect(MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
});
console.log("Connected to mongoDB");
}
catch(err){
    console.log('error');
}

//router use
app.use('/book',bookroutes);
app.use('/user',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
})
