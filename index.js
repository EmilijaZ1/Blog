import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const mypassword = "emz";
var userIsAuthorised = false;

var aname = [];
var bname = [];
var tname = [];
var count = 0;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "emz") {
    userIsAuthorised = true;
  }
  next();
  }

app.use(passwordCheck);

app.get("/", (req,res) => {
    res.render("index.ejs");
  })

app.get("/bloglist", (req,res) => {
  // res.render("bloglist.ejs");
  res.render("bloglist.ejs", {namea: aname, nameb: bname});
})
   
app.get("/about", (req,res) => {
    res.render("about.ejs");
})

app.get("/create", (req,res) => {
  res.render("create.ejs");
})


app.put("/blog", (req, res) => {
  console.log("hello put blog");


  console.log(tname[0]);
  tname[0] = req.body["updatetext"];
  console.log(tname[0]);
  res.render("blog.ejs", {namea: aname[0], nameb: bname[0], namet: tname[0]});

}); 



app.get("/blog", (req,res) => {

  console.log("hello get blog");
  res.render("blog.ejs", {namea: aname[0], nameb: bname[0], namet: tname[0]});
  
})

app.get("/blog2", (req,res) => {
  res.render("blog.ejs", {namea: aname[1], nameb: bname[1], namet: tname[1]});
 
})


app.get("/blog3", (req,res) => {
  res.render("blog.ejs", {namea: aname[2], nameb: bname[2], namet: tname[2]});
})


app.get("/contact", (req,res) => {
    res.render("contact.ejs");
})


app.post("/create", (req, res) => {
  if (userIsAuthorised) {
      res.render("create.ejs");
      } else {
      res.redirect("/");
      }
// res.render("index.ejs", {key: value});

});  


app.post("/blog", (req, res) => {
  // res.render("blog.ejs", {});
  // aname = req.body["namea"];
  // bname = req.body["nameb"];
  // tname = req.body["text"];
  console.log("hello post blog");
  aname.push(req.body["namea"]);
  bname.push(req.body["nameb"]);
  tname.push(req.body["text"]);

  res.render("blog.ejs", {namea: aname[count], nameb: bname[count], namet: tname[count]});
  count++;
});  





app.post("/blog2", (req, res) => {
  // res.render("blog.ejs", {});
  // aname = req.body["namea"];
  // bname = req.body["nameb"];
  // tname = req.body["text"];
 
  aname.push(req.body["namea"]);

  bname.push(req.body["nameb"]);
  tname.push(req.body["text"]);

  res.render("blog2.ejs", {namea: aname[1], nameb: bname[1], namet: tname[1]});
  
}); 









app.post("/blog3", (req, res) => {
  // res.render("blog.ejs", {});
  // aname = req.body["namea"];
  // bname = req.body["nameb"];
  // tname = req.body["text"];

  aname.push(req.body["namea"]);
  bname.push(req.body["nameb"]);
  tname.push(req.body["text"]);

  res.render("blog3.ejs", {namea: aname[2], nameb: bname[2], namet: tname[2]});
}); 





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

    
