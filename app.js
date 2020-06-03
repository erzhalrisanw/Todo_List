const express = require("express");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const app = express();

//const items = ["Sleep","Code","Repeat"];

//const completeItems = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/tododDB",{useUnifiedTopology: true, useUnifiedTopology: true});
const itemSchema = {
  name: String
};
const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name: "Sleep"
});

const item2 = new Item({
  name: "Code"
});

const item3 = new Item({
  name: "Repeat"
});

const DefaultItems = [item1 , item2, item3];


app.get("/",function(req,res){
  const today= new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  const currentDay = today.toLocaleDateString("en-US",options);
  Item.find({},function(err,foundItems){
    if(foundItems.length === 0)
    {
      Item.insertMany(DefaultItems,function(err)
      {
          if(err){
            console.log(err);
          }else{
            console.log("Inserted successfully!!");
          }
      });
      res.redirect("/");
    }else{
        res.render("list",{listTitle:currentDay , newTask:foundItems});
    }
  });
});

app.post("/",function(req,res){
  const item = req.body.newTask;
  // var complete = req.body.Mycheck;
  // console.log(complete);
  // if(typeof complete === "string")
  // {
  //   newTask.splice(newTask.indexOf(complete), 1);
  // }
  //items.push(item);

const items  = new Item({
  name: item
});
  items.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const CheckItemId = req.body.checkbox;
  Item.findByIdAndRemove(CheckItemId,function(err){
    if(!err){
      console.log("successfully deleted!!");
    }
    else{
      console.log(err);
    }
    res.redirect("/");
  });
});

// app.post("/",function(req,res){
//   const item = req.body.newTask;
//   if(req.body.list === "complete")
//   {
//     completeItems.push(item);
//     res.redirect("/complete");
//   }
//   else{
//       items.push(item);
//       res.redirect("/");
//   }
// });
//
// app.get("/work",function(req,res){
//     res.render("list",{listTitle:"Work List" , newTask:workItems});
// });

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})





// const jsdom = require("jsdom");
// const JSDOM = jsdom.JSDOM;
// const dom = new JSDOM();
// console.log(dom.window.document.querySelector("p").textContent);
