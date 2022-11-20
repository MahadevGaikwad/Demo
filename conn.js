var mysql=require("mysql"); 
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"register"
});
module.exports=conn;