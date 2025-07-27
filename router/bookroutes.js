const express = require('express');
const router = express.Router();

const Book = require('../Model/book.model.js');
//user model
const User = require('../Model/user.model.js');
const {jwtAuthMiddleWare,generateToken} = require('../jwt.js');
//middleware function
const isAdmin = (req,res,next) =>{
if(req.user.role === 'admin'){
    next();
}
else{
    return res.status(403).json({message: "Access denied. Admin only"});
}
}
//post function for to add
router.post('/add',jwtAuthMiddleWare,isAdmin,async(req,res)=>{
    try{
const data = req.body;
//add new books
const newBook = new Book(data);
//save
const response = await newBook.save();
res.status(200).json({message: "Book is successfully added"});
    }
    catch(err){
console.log(err);
return res.status(500).json({error:"Internal server error"});
    }
})
//get function for to read (asynchronous operation performs in synchronous manner)
router.get('/',async(req,res)=>{
    try{
const book = await Book.find();
res.status(200).json({message: "book found"});
    }
    catch(err){
console.log(err);
res.status(500).json({error:"Internal server error"});
    }
   
})
//put method for to update the books
router.put('/update/:id',jwtAuthMiddleWare,isAdmin,async(req,res)=>{
    try{
const bookid = req.params.id;//extract the id from the url parameter
const UpdatedData =req.body; //extract the updated id form the body

const response = await Book.findByIdAndUpdate(bookid,UpdatedData,{
    new: true,
    runValidators: true
});
if(!response){
    return res.status(404).json({message:'Book not found'});
}
res.status(200).json({message: 'Books updated'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})
//delete method for to delete the books
router.delete('/delete/:id',jwtAuthMiddleWare,isAdmin,async(req,res)=>{
    try{
const bookid = req.params.id;
const response = await Book.findByIdAndDelete(bookid);
if(!response){
    return res.status(404).json({message:'Book not found'});
}
res.status(200).json({message: 'BOOK is deleted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports = router;
