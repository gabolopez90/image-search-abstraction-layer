const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const qwant = require("qwant-api");
var app = express();
var mlab = "mongodb://gabo:user@ds117271.mlab.com:17271/to-do";
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var imgSrch = require("./models/imgSrch");

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://gabo:user@ds117271.mlab.com:17271/to-do");
app.use(express.static(__dirname+ "/public/"));

app.get("/history/", (req, res)=>{
   imgSrch.find({},null,{
      "limit": 10,
      "sort": {
         "searchDate": -1
      }
   }, (err, history)=>{
      if(err) return res.send("Problem connecting to database");
      res.send(history.map(function(arg){
         return {
            userSearch: arg.userSearch,
            searchDate: arg.searchDate
         };
      }));
   });
});

app.get("/api/imagesearch/:search*", (req, res)=>{
   var userSearch = req.params.search;
   var userQuery = req.query.offset;
   var data = new imgSrch({
      userSearch: userSearch,
      searchDate: new Date
   });
   data.save((err)=>{
      if(err){
      return res.send("Problem connecting to database");
      }
   });
   qwant.search("images", { query: userSearch,offset: userQuery, count: 10, language: "english" }, function(err, data){
      if (err) return console.log(err);
      var qwantSearch = [];
      for(let i=0; i<10;i++){
         qwantSearch.push({
            url: data.data.result.items[i].media,
            snippet: data.data.result.items[i].title,
            thumbnail: data.data.result.items[i].thumbnail,
            context: data.data.result.items[i].url
         });
      }
      res.send(qwantSearch);
   });
});

app.listen(process.env.PORT, function(){
   console.log("Now listening on port "+ process.env.PORT);
});