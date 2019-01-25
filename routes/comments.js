var express     = require("express"),
    router      = express.Router({mergeParams:true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment")

//Comment route
router.post("/",islogedin,function(req,res)
{
	Campground.findById(req.params.id,function(err,campground)
	{
		if(err)
		{
			res.redirect("/campgrounds");
		}
		else
		{
			 
			Comment.create(req.body.comment,function(err,comment)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
                    comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					console.log(comment.author);
                    comment.save();
					campground.comments.push(comment._id);
					campground.save();
					res.redirect('/campgrounds/'+ campground._id);
				}
			});
		}
	});
});

router.get("/new",islogedin,function(req,res)
{
	Campground.findById(req.params.id,function(err,campground)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/new",{campground: campground});
		}
	});
	
});

function islogedin(req,res,next)
{
	if(req.isAuthenticated())
	{
		return next();
	}
	else
	{
		res.redirect("/login");
	}
}

module.exports = router