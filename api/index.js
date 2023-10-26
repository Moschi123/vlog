const express = require("express");
const app=express();
const { dbConnection } = require("./config");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users.js");
const postRoute=require("./routes/posts.js");
const catRoute=require ("./routes/categories");
const multer = require("multer");
const path=require("path")
dbConnection();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been update")
})
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",catRoute);

app.use("/moschi",(req,res)=>{
    console.log("hey this is moschi url")
})

app.listen("5000", ()=>{
    console.log("Backend is running");
});