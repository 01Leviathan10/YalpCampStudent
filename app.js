var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Dunav", image: "http://www.camping.rs/wp-content/uploads/2013/08/2809-044.jpg"},
    {name: "Borsko Jezero", image: "http://www.camping.rs/wp-content/uploads/2013/08/111-710x473.jpg"},
    {name: "Toma", image: "http://www.camping.rs/wp-content/uploads/2013/08/kamp_Toma11-710x532.jpg"}
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function (req, res) {
   res.render("new") 
});

app.post("/campgrounds", function (req,res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampgrund = {name: name, image: image};
    campgrounds.push(newCampgrund);
    res.redirect("/campgrounds");
});


app.listen(3000, function (req, res) {
    console.log("Strating server...")
});