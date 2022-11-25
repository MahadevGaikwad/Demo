const conn=require("./conn");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.set('views','./view');
const multer=require("multer");
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
    let pass=req.body.pass;
    console.log(req.body);
    conn.connect(function(error){
        if(error) throw error;
        var query="Insert into userregister(name,email,pass) Values('"+name+"','"+email+"','"+pass+"')";
        conn.query(query,function(err,result){
            if(err) throw err;
             res.render("Login");   
        
        })
    } );
     
});
app.post("/login",(req,res)=>{
    let username=req.body.email;
    let password=req.body.pass;
    console.log(req.body);
    conn.connect(function(error){
        if(error) throw error;
        var query="select *from userregister where email='"+username+"' And pass='"+password+"'";
        conn.query(query,function(err,result){
            if(err) throw err;
            res.render("Home");
        
        })
    } );

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"Public")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname + "-"+Date.now()+".jpg");
        }
    })
}).single("uploaded_file");
app.post("/upload",upload,(req,res)=>{
    if (!req.file) {
        console.log("No file received");
          message = "Error! in image upload."
       // res.render('index',{message: message, status:'danger'});
    
      } else {
        console.log('file received');
        console.log(req);
        var sql = "INSERT INTO `file`(`file_name`,`email`) VALUES ('"+req.file.filename+"','"+username+"')";
                var query = conn.query(sql, function(err, result) {
                   console.log('inserted data');
                });
        message = "Successfully! uploaded";
        res.send(message);
      }
})
   app.get("/getAll",(req,res)=>{
    
    module.exports={ 
        displayImage:function(callback){
         // check unique email address
         var sql='SELECT file_name FROM file';
         db.query(sql,function (err, data, fields) {
         if(err) throw err
         return callback(data);
        })
        }
      }
   })
});

app.listen(5000, () => console.log("server start"));
module.exports={
    displayImage:function(req,res){
    imageModel.displayImage(function(data ){
     res.render('AllData',{imagePath:data})
    })
        
     }
    }