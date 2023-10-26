const router= require("express").Router();
const User=require("../models/User");
const Post=require("../models/Post")

//CREATE POST
router.put("/:id",async(req,res) =>{

try {
    const savedPost= await new Post.save();
    res.status(200).json(savedPost)

} catch (error) {
    res.status(500).json(error);
}
    
});

//UPDATE POST
router.put("/:id",async(req,res) =>{
   try {
    const post= await Post.findById(req.params.id);
    if(post.username === req.body.username){
        try {
            const updatePost= await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },
                {new:true}
            );
            res.status(200).json(updatePost)
        } catch (error) {
           res.status(500).json(error) 
        }
    }else{
        res.status(401).json("You canonluy update your post")
    }
   } catch (error) {
    res.status(500).json(error)
   } 
});


//DELETE POST
router.delete("/:id",async(req,res) =>{
    try {
     const post= await Post.findById(req.params.id);
     if(post.username === req.body.username){
         try {
            await post.delete();
            res.status(200).json("POst has been delted...")
         } catch (error) {
            res.status(500).json(error) 
         }
     }else{
         res.status(401).json("You canonluy delete your post")
     }
    } catch (error) {
     res.status(500).json(error)
    } 
 });

//GET POST


router.get("/:id",async(req,res) =>{
    try {
        const post=await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
})


//GET ALL POSTS
router.get("/",async(req,res) =>{
    const username=req.query.user;
    const catName=req.query.cat;
    try {
       let posts;
       if(username){
        posts=await Post.find({username})
       }else if (catName){
        posts = await Post.find({categories:{
            $in:[catName]
        }})
       }else{
        posts= await Post.find(posts)
       }
       res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports =router
