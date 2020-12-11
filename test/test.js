
let chai = require ("chai");
let chaiHttp = require ("chai-http");
let server = require ("../index");
let user;

chai.should();

chai.use(chaiHttp);


let userID=0; 
describe ('data' ,() => {

    before(function() {
        console.log("........Before Test Start.............")

         user={
        
          FirstName: "firstname",
          LastName: "lastname",
          address: "address",
          salary : 25000
       
        };

    })

    after(function() {
        
      console.log("........After Test Ended.............")
  })


    /******************************** Test the POST route **********************************/
    describe("/addusers",() => {
        it("It should post new data", (done) => {
          
            chai.request(server)
            .post("/addusers")
            .send(user)
            .end((err, response) => {
                 response.should.have.status(200);
                 response.body.should.be.an('object');
                 userID = response.body.data.insertId
                 console.log(userID);
                 console.log(response.body);
             done();
            })
        })
    })
  
    
     /************************** Test the GET route *****************************/
    describe("/getusers",() => {
        it("It should get all the data", (done) => {
            chai.request(server)
            .get("/getusers")
            .end((err, response) => {
                 response.should.have.status(200);
                 response.body.should.be.an('object');
                 console.log(response.body);
             done();
            })
        })
    })
  
      
     /********************************* Test the GET (by id) route *****************************/

     describe("/getuserid/id",() => {
        it("It should get a data by id", (done) => {
            chai.request(server)
            chai.request(server)
            .get("/getuserid/" + userID)
            .end((err, response) => {
                console.log(response.body);
                 response.should.have.status(200);
                 response.body.should.be.an('object');
                 response.body.data[0].should.have.property('id');
             done();
            })
        })
    })

     
     /********************************************** Test the PUT route *************************************/
     describe("/update/:id",() => {
        it("It should put new data", (done) => {
           const data =  {
               
                "FirstName": "Vaishnavi",
                "LastName": "Avhad",
                "address": "Nashik",
                "salary": 25000
            }
            chai.request(server)
            .put("/update/"+ userID)
            .send(data)
            .end((err, response) => {
                 response.should.have.status(200);
                 response.body.should.be.an('object');
                 console.log(response.body);
             done();
            })
        })
    })
      
     /********************************* Test the DELETE (by id) route *****************************/

     describe("/delete/id",() => {
        it("It should delete a data by id", (done) => {
            chai.request(server)
            .delete("/delete/" + userID)
            .end((err, response) => {
                console.log(response.body);
                 response.should.have.status(200);
                 response.body.should.be.an('object');
             done();
            })
        })
    })
      
     
});