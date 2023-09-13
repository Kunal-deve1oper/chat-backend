const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwtToken");

/**register a new user
 * /signup
 */
const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({msg:"cannot be empty"});
    }
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("User already Exists");
      }
    } catch (error) {
      return res.status(400).send({error:error.message});
    }
    try {
      const pass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        password: pass,
        email: email,
        pic: pic,
      });
      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pic: newUser.pic,
          token: generateToken(newUser._id),
        });
      } else {
        throw new Error("database problem")
      }
    } catch (error) {
      return res.status(400).send({error:error.message});
    }
  } catch (error) {
    return res.status(400).send({error:error.message});
  }
};

/**login a user 
 * /login
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ( !email || !password) {
      return res.status(400).send({error: "cannot be empty"});
    }
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password,(err,result)=>{
        if(err)
        {
          return res.status(400).send({error: "pass doesnot match"});
        }
        if(result){
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        })
      }
      else 
      {
        return res.status(400).send({error: "pass not match"});
      }
      })
      
    } else {
      res.status(400).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error:error.message });
  }
};


/**
 * /api/user?search=kunal
*/

const allUser = async(req,res)=>{
  try {
    const keyword = req.query.search ? {
      $or: [
        {name: {$regex: req.query.search, $options: "i"}},
        {email: {$regex: req.query.search, $options: "i"}}
      ]
    }:{};
    const user = await User.find(keyword).find({ _id:{$ne: req.user._id}}).select("-password");
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send({ msg:"could not find"});
  }
}

module.exports = { registerUser, loginUser, allUser };
