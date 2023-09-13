const User = require("../model/userModel");
const jwt = require("jsonwebtoken");


const auth = async(req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select("-password");
            
            next();
        } catch (error) {
            res.status(401).send({error: "User not found"});
        }
    }
    else
    {
        res.status(401).send({msg: "no token found"});
    }
}

module.exports = auth;