const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    password:{
        type: String,
        required: true
    }

});
userSchema.pre('save',async function(next){
    const user =this ;
    //hashed password by getting that password is new or modified

    if(!user.isModified('password')){
        return next();
    }
try{
//salt generation in hashing password
const salt = await bcrypt.genSalt(10);
//hashed password
const hashedPassword = await bcrypt.hash(user.password,salt);
//override this into original password
user.password = hashedPassword;
next();
}
catch(err){
    console.log(err);
    return next(error);

}
})

const User = mongoose.model('User',userSchema);
module.exports = User;