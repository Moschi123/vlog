const router= require("express").Router();
const User=require("../models/User");
const bcrypt = require("bcrypt");
//Register
router.post("/register",async(req,res) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass =await bcrypt.hash(req.body.password ,salt)
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });

        const user= await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
});


//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("Wrong credentials"); // Devuelve una respuesta y usa 'return' para evitar respuestas duplicadas.
      }
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        return res.status(400).json("Wrong credentials"); // Devuelve una respuesta y usa 'return' para evitar respuestas duplicadas.
      }
  
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error); // Envía una respuesta de error 500 en caso de error.
    }
  });
  


module.exports =router

