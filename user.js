
 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql');
 var bodyParser = require ('body-parser');

 const Response = require ('./response');
 this.response = new Response();

 router.use(bodyParser.urlencoded({ extended : false}))

 router.use(bodyParser.json())

 const pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : "root",
    password : "" ,
    database : "datadb"
})
 router.get('/getusers',  (req , res) => {

 pool.getConnection((err , connection) =>{         if(err) 
      console.log(err);
         else
         console.log(`connected as id ${connection.threadId}`);

       connection.query('SELECT * from data', (err,rows) =>{
        connection.release();
         let returnValue = this;
         let self = this;


           if(err) {
                returnValue = self.response.failure("error");
                res.send(returnValue);
            } else {
             //  console.log(err);
             returnValue = self.response.success(rows);
                res.send(returnValue);
          }
      })
   })
 })


 
//Display data for specific ID:
router.get('/getuserid/:id' , (req , res) => {

     pool.getConnection((err , connection) =>{
         if(err) 
         console.log(err);
         else
         console.log(`connected as id ${connection.threadId}`);

         connection.query('SELECT * from data WHERE id=?',[req.params.id], (err,rows) =>{
         connection.release();
         let returnValue = this;
         let self = this;


           if(err) {
                returnValue = self.response.failure("error");
                res.send(returnValue);
            } else {
             //  console.log(err);
             returnValue = self.response.success(rows);
                res.send(returnValue);
          }

         })
     })
})


 //to delete data of specific ID:
 router.delete('/delete/:id' , (req , res) => {

     pool.getConnection((err , connection) =>{
         if(err) 
         console.log(err);
         else
         console.log(`connected as id ${connection.threadId}`);

         connection.query('DELETE from data WHERE id=?',[req.params.id], (err,rows) =>{
         connection.release();

         let returnValue = this;
         let self = this;


           if(err) {
                returnValue = self.response.failure("error");
                res.send(returnValue);
            } else {
             //  console.log(err);
             returnValue = self.response.success(rows);
                res.send(returnValue);
          }
            
        })
     })
 })



 //add data :
 router.post('/addusers' , (req , res) => {

     pool.getConnection((err , connection) =>{
         if(err) 
         console.log(err);
         else
         console.log(`connected as id ${connection.threadId}`);
 
         const params = req.body;
        connection.query('INSERT INTO data SET ?',params, (err,rows) =>{
       connection.release();

    
       let returnValue = this;
       let self = this;


         if(err) {
              returnValue = self.response.failure("error");
              res.send(returnValue);
          } else {
           //  console.log(err);
           returnValue = self.response.success(rows);
              res.send(returnValue);
        }
         })
     })
 })

// //data update:

 router.put('/update/:id' , (req , res) => {

     pool.getConnection((err , connection) =>{
         if(err) throw err
         console.log(`connected as id ${connection.threadId}`);
        
         const { id, FirstName , LastName , address , salary} = req.body;


         connection.query('UPDATE data SET FirstName = ? ,LastName = ? ,address = ? ,salary = ? WHERE id = ?',[FirstName, LastName , address , salary,req.params.id], (err,rows) =>{
         connection.release();


         let returnValue = this;
         let self = this;
  
  
           if(err) {
                returnValue = self.response.failure("error");
                res.send(returnValue);
            } else {
             //  console.log(err);
             returnValue = self.response.success(rows);
                res.send(returnValue);
          }

         })
         console.log(req.body);
     })
 })

module.exports = router