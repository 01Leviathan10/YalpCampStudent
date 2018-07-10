var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yepl_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create( 
//     {
//     name: "Borsko Jezero", 
//     image: "http://www.camping.rs/wp-content/uploads/2013/08/111-710x473.jpg"
//     }, function (err, campground) {
//             if (err) {
//                 console.log(err);
//             }else {
//                 console.log("NEWLY CREATED CAMPGROUND: ");
//                 console.log(campground);
//                 }
// });

var campgrounds = [
    {name: "Dunav", image: "http://www.camping.rs/wp-content/uploads/2013/08/2809-044.jpg"},
    {name: "Borsko Jezero", image: "http://www.camping.rs/wp-content/uploads/2013/08/111-710x473.jpg"},
    {name: "Toma", image: "http://www.camping.rs/wp-content/uploads/2013/08/kamp_Toma11-710x532.jpg"}
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    //all camprounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", function (req, res) {
   res.render("new") 
});

app.post("/campgrounds", function (req,res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampgrund = {name: name, image: image};
    //create new campground andsav to DB
    Campground.create(newCampgrund, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});


app.listen(3000, function (req, res) {
    console.log("Strating server...")
});