const Users = require('../models/user');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

exports.addUsers =async (req,res,next)=>{
 try{
 const {name,phoneno,email,password} = req.body;
 
 if (!email || !password || !name || !phoneno) {
    return res.status(400).json({ error: 'Bad Parameter: Something is missing' });
  }

  
   const existingUser = await Users.findOne({
    where: {
        [Sequelize.Op.or]: [
            { email: email },
            { phoneno: phoneno }
        ]
    }
});
if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email or phone number' });
}


     
const hashedPassword = await bcrypt.hash(password, 10); 

const newUser = await Users.create({ 
    name,
     email:email.toLowerCase(),
      phoneno,
 password:hashedPassword 
});


res.status(201).json({ message: 'User added successfully', user: newUser });

 }catch(err){
    console.log(err);
    res.status(500).json({ message: 'An error occurred', error: err });
 }
}



exports.generateAccessToken = function(id,name){
   
    return jwt.sign({userId:id,name:name},process.env.jwt_secretkey);
}




exports.userlogin = async(req,res,next)=>{
    const{email,password} = req.body;
    try{
  const UserPresent=await Users.findOne({where:{email:email}});

  if(UserPresent){
    bcrypt.compare(password,UserPresent.password,(err,result)=>{
        if(err)
        {
            throw new Error('Something Went Wrong');
        }
        if(result==true)
        {
            
            const token = exports.generateAccessToken(UserPresent.id, UserPresent.name); 
            return res.status(200).json({ message: 'Login Successfully', token: token });
          }else{
            return res.status(401).json({error:'Incorrect Password'});
        }
    })
   
}else{
    return res.status(404).json({error:'Email does not exist'});
    
}






    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'An error occurred', error: err });
     }
}


// Fetch current user's profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes the `auth` middleware provides the user ID
        const user = await Users.findByPk(userId, {
            attributes: ['name', 'email', 'phoneno', 'career_goals'] // Only send selected fields
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, email, phoneno, career_goals } = req.body;

    try {
        const userId = req.user.id;

        // Update the user's profile
        const [updatedRowsCount] = await Users.update(
            { name, email, phoneno, career_goals },
            { where: { id: userId } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};