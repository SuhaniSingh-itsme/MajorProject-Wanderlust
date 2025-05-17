const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const Review = require("../models/review");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn, 
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.createListing)
);

router.get("/trending", listingController.trendingListing);

router.get("/rooms", listingController.roomsListing);

router.get("/cities", listingController.citiesListing);

router.get("/mountain", listingController.mountainListing);

router.get("/castles", listingController.castlesListing);

router.get("/pools", listingController.poolsListing);

router.get("/camping", listingController.campingListing);

router.get("/farms", listingController.farmsListing);

router.get("/arctic", listingController.arcticListing);

router.get("/breakfasts", listingController.breakfastsListing);

router.get("/boats", listingController.boatsListing);

router.get("/domes", listingController.domesListing);


//search route
router.get("/search", async(req, res) => {
    const {q} = req.query;

    if (!q || q.trim() === "") {
        req.flash("error", "Please enter a search term.");
        return res.redirect("/listings");
    }
    const regex = new RegExp(q, "i");
    const listing = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index", { allListings:listing , searchTerm: q });
});


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, 
    isOwner, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isOwner,
    wrapAsync(listingController.destroyListing)
);


//Edit Route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports =  router;