const conn=require("./conn");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views','./view');
//const port=process.env.PORT||3000
app.get("/",(req,res)=>{
    res.render("Register");

});
app.get("/login",(req,res)=>{
    res.render("Login");

});
app.post("/",(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let pass=req.body.password;
    console.log(req.body);
    conn.connect(function(error){
        if(error) throw error;
        var query="Insert into userregister(name,email,pass) Values('"+name+"','"+email+"','"+pass+"')";
        conn.query(query,function(err,result){
            if(err) throw err;
             res.render("Login");   
        
        })
    } );
     app.post('/login',(req,res)=>{
         let username=req.body.email;
         let password=req.body.pass;
         console.log(res);
         var query1="select *from userregister where email='"+username+"' AND pass='"+password+"' ";
         conn.query(query1,function(error,res){
            if(error)throw error;
            res.send("Hello");
         })
        console.log(res);
    })
    
})
app.listen(5000, () => console.log("server start"));