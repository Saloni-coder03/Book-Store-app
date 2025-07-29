const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// import the user model
const Person = require('../Model/person.model.js');
const {jwtAuthMiddleWare,generateToken} = require('../jwt.js');

//register
router.post('/register',async (req,res) =>{
try{
    const{name,email,password,role} = req.body;
  // Check if email already exists
    const existingUser = await Person.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    // new registration
    const newPerson = new Person({name,email,password,role});
//save
const response =await newPerson.save();
console.log("Registration successful");
//token
const payload = {
    id: response.id,
    role: response.role,
    email: response.email
};
const token = generateToken(payload);
res.status(200).json({response: response,token: token})

}catch(err){
    console.log(err)
    res.status(500).json({error: 'Internal server error'});
}
})

//login
router.post('/login',async (req,res)=>{
const {email,password} = req.body;
try{
//check unique thing i.e. email
const user = await Person.findOne({email});
if(!user){
    return res.status(404).json({message: 'User not found'});
}
const match = await bcrypt.compare(password,user.password);
if(!match){
    return res.status(403).json({message:'Incorrect password'});
}
//token generation
const payload = {
id : user.id,
role: user.role,
email: user.email
}
const token = generateToken(payload);
console.log("token is : " +token);
res.status(200).json({token: token});
}
catch(err){
    console.log(err);
    res.status(200).json({error: 'Internal server error' });
}
});
module.exports = router;
    
