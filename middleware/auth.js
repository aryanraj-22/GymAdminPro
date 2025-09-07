const jwt = require('jsonwebtoken');
const Gym = require('../Models/gym');
require('dotenv').config();


const auth = async (req, res, next) =>{
    
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if(!token){
        return res.status(401).json({ error: 'No token, authorization denied' });
    }else{
        try{
            const decode = jwt.verify(token,process.env.JWT_SecretKey);
            req.gym = await Gym.findById(decode.gymId).select('-password');
            next();
        }catch(err){
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
}

module.exports = auth;