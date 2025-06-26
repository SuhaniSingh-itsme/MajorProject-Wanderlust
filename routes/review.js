const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const { isLoggedIn, validateReview, isReviewAuthor, isCurrUser } = require("../middleware.js"); 
const reviewController = require("../controllers/reviews.js")

//POST Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 
//DELETE Review Route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.destroyReview));
 

module.exports = router;