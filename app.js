var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDb        = require("./seeds"),
	mongoose      = require("mongoose"),
	campgroundRoute = require("./routes/campgrounds"),
	commentRoute  = require("./routes/comments"),
	indexRoute    = require("./routes/index");

 //seedDb();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"I am in Lovely",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
	res.locals.currentUser = req.user;
	next();
});

app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);
app.use(indexRoute);

app.listen(4000,function()
{
	console.log("server has started!");
});