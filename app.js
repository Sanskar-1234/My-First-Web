const express = require("express");
const path = require("path")
const fs = require("fs");
// const { callbackify } = require("util");
const app = express();
const port = 80;

//EXPRESS SPECIC STUFF
app.use('/static' , express.static("static"))//for serving static files 
app.use(express.urlencoded())

//PUG SPECIC STUFF
app.set('view engine', 'pug')// set the template engine as pug 
app.set("views",path.join(__dirname , 'views'))//set the views directry 

//ENDPOINTS
app.get("/index", (req , res)=>{
  const con = "This is the best content on the intentet so far so use it wisely !"
  const abc = {"title": "World best gym " , "content"  : con}
  res.status(200).render('index.pug' , abc);
})

app.post("/" , (req,res)=>{
  name1 = req.body.name
  age = req.body.age
  gender = req.body.gender
  address = req.body.address
  more = req.body.more

  const filePath = './clients/client.txt';
  const client_data = `\n\nThe name of the client is ${name1} \nage is ${age} \nGender is ${gender} \naddress is "${address}" \nMore about him/her ${more}`

  // fs.writeFileSync("./clients/client.txt",client_data)
  

  fs.appendFile(filePath, client_data, (err) => {
    if (err) {
      console.error('Error appending to the file:', err);
    } else {
      console.log('Data successfully appended!');
    }
  });


  const abc = {"title": "Your form has been submitted successfully !"}
  res.status(200).render('submit.pug' , abc);

  // const abcd = "THis is home page"
  // res.status(200).render("home.pug" , abcd )
})

app.get("/" , (req , res)=>{
  res.status(200).render("home" ,  { "title": 'This is home page' } );
})

app.get("/home" , (req , res)=>{
  res.status(200).render("home" ,  { "title": 'This is home page' } );
})

app.get("/about" , (req , res)=>{
  res.status(200).render("about" ,  { "title": 'this is about us page' } );
})

app.get("/contact" , (req , res)=>{
  res.status(200).render("contact" ,  { "title": 'this is contact us page' } );
})

// app.post("/home", (req,res))

app.listen(port, ()=>{
  console.log(`The applicatin has started successfully on port ${port}`);
})

// ******************************************
