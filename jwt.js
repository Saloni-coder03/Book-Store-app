const jwt =require('jsonwebtoken');


const jwtAuthMiddleWare = async (req,res,next) =>{
const authorization = req.headers.authorization;
if(!authorization){
    return res.status(401).json({message: 'Token is not found'});
}
const token = req.headers.authorization.split(' ')[1];
if(!token){
    return res.status(401).json({message: 'Unauthorized'})
}
try{
//verify tokens
const decoded = await jwt.verify(token,process.env.JWT_SECRET);
req.user = decoded;
next();
}
catch(err){
    return res.status(401).json({message: 'Invalid token'});
}
}
//functions to generate jwt token
const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleWare,generateToken}; 





