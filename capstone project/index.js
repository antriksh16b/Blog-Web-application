import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
const app=express();
const port=3000;
const userBlogs={};
var deleteBlog;
const blogs=["Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae blanditiis, suscipit fugiat molestiae alias, eveniet sit voluptatem unde <span class='dots'>....</span><span class='more'>eum odit repellat accusantium facilis incidunt iste, reprehenderit voluptates libero delectus?</span>",
"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae blanditiis, suscipit fugiat molestiae alias, eveniet sit voluptatem unde <span class='dots'>....</span><span class='more'>eum odit repellat accusantium facilis incidunt iste, reprehenderit voluptates libero delectus?</span>",
"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae blanditiis, suscipit fugiat molestiae alias, eveniet sit voluptatem unde <span class='dots'>....</span><span class='more'>eum odit repellat accusantium facilis incidunt iste, reprehenderit voluptates libero delectus?</span>",
"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae blanditiis, suscipit fugiat molestiae alias, eveniet sit voluptatem unde <span class='dots'>....</span><span class='more'>eum odit repellat accusantium facilis incidunt iste, reprehenderit voluptates libero delectus?</span>",
"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae blanditiis, suscipit fugiat molestiae alias, eveniet sit voluptatem unde <span class='dots'>....</span><span class='more'>eum odit repellat accusantium facilis incidunt iste, reprehenderit voluptates libero delectus?</span>"];
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));
app.use((req,res,next)=>{
    if((req.body.head && req.body.blog)){
     if(blogs[req.body.head]){
         blogs[req.body.head]= req.body.blog;
     }
     else if(userBlogs[req.body.head] || (req.body.head && req.body.blog)){
        userBlogs[req.body.head]= req.body.blog;
    }
}
     next();
});
app.use((req,res,next)=>{
if(Object.keys(userBlogs).length!=0){
for(let i in userBlogs){
    if(userBlogs.hasOwnProperty(i) || blogs.includes(i)){
    app.get(`/reading/${i}`,(req,res)=>{
        res.render("editdelete.ejs",{heading:i,writtenblog:userBlogs[i]});
    });
}
}}
next()
});
blogs.forEach((currentValue,index)=>{
    app.get(`/reading/${index}`,(req,res)=>{
        res.render("editdelete.ejs",{writtenblog:blogs[index],heading:index});
    });
});
app.post("/write",(req,res)=>{
    res.render("writeblog.ejs",{heading : req.body.title});
});
app.post("/saved",(req,res)=>{
    res.render("editdelete.ejs",{writtenblog:req.body.blog,heading:req.body.head});
});
app.post("/delete",(req,res)=>{
    if(userBlogs[req.body.head]){
        delete userBlogs[req.body.head];
    }
    else{
        blogs.splice(req.body.head,1);
    }
    res.send("deleted");
})
app.post("/",(req,res)=>{
    // let writableStream=fs.createWriteStream(`d:/javascript/Backend module/capstone project/files/${req.body.head}.txt`);
    // writableStream.write(req.body.head);
    // writableStream.write(req.body.blog);
    // res.send("Namaste");
    res.render("index.ejs",{userBlogs: userBlogs,blogs : blogs});
});
app.get("/",(req,res)=>{
    res.render("index.ejs",{userBlogs: userBlogs,blogs : blogs});
});
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});