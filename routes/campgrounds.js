var express = require("express"),
    router  = express.Router(),
    Campground  = require("../models/campground");

router.get("/",function(req,res)
{
	Campground.find({},function(err,allcampgrounds)
	{
		if(err)
		{
			console.log("error");
		}
		else
		{
			res.render("index",{campgrounds: allcampgrounds, currentUser: req.user});
		}
	});
});

router.post("/",function(req,res)
{
	var name  = req.body.name;
	var image = req.body.image;
	var desc  = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	Campground.create(newCampground,function(err,newlycreated)
	{
		if(err)
		{
			console.log("error");
		}
		else
		{
			res.redirect("/campgrounds");
		}	
	})
});

router.get("/addCamp",function(req,res)
{
	res.render("addCamp");
});

router.get("/:id",function(req,res)
{
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground)
	{
		if(err)
		{
			console.log("error");
		}
		else
		{
			res.render("show",{campground: foundCampground});
		}
	});
});

module.exports = router