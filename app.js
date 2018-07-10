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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create( 
//     {
//     name: "Borsko Jezero", 
//     image: "http://www.camping.rs/wp-content/uploads/2013/08/111-710x473.jpg",
//     description: "This is a huge granite hill, no bathrooms."
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
// INDEX - show all campgrounds
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

//CREATE - add new campground to DB
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
//NEW - show from to create new campground
app.get("/campgrounds/new", function (req, res) {
   res.render("new"); 
});

app.get("/campgrounds/:id", function (req, res) {
    //FIND THE CAMPGROUND WITH ID

   res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});
//SHOW - shows more info about one campground
app.listen(3000, function (req, res) {
    console.log("Strating server...");
});