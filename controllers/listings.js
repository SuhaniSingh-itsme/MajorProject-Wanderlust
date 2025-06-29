const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.trendingListing = async (req, res) => {
    try {
        const listing1 = await Listing.findOne({ title: "Thermes Cliffside Villa" });
        const listing2 = await Listing.findOne({ title: "Cliffside Haven in Granada" });
        console.log(listing1, listing2);
        res.render("filters/trending.ejs", { listing1, listing2 });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.roomsListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Glamour by the Shore"});
    let listing2 = await Listing.findOne({title: "Modern Loft in Downtown"});
    console.log(listing1, listing2);
    res.render("filters/rooms.ejs", {listing1, listing2});
}

module.exports.citiesListing = async(req, res) => {
    let listing = await Listing.findOne({title: "City View Penthouse"});
    console.log(listing);
    res.render("filters/cities.ejs", {listing});
}

module.exports.mountainListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Mountain Retreat"});
    let listing2 = await Listing.findOne({title: "Above the Clouds"});
    let listing3 = await Listing.findOne({title: "Changthang Serenity"});
    console.log(listing1, listing2, listing3);
    res.render("filters/mountain.ejs", {listing1, listing2, listing3});
}

module.exports.castlesListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Zermatt Alpine Chalet"});
    let listing2 = await Listing.findOne({title: "Spring Whispers at Hirosaki"});
    console.log(listing1, listing2);
    res.render("filters/castles.ejs", {listing1, listing2});
}

module.exports.poolsListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Azure Escape by the Bay"});
    let listing2 = await Listing.findOne({title: "Ubud Jungle Pool Villa"});
    console.log(listing1, listing2);
    res.render("filters/pools.ejs", {listing1, listing2});
}

module.exports.campingListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Frozen Fires in the Sky"});
    let listing2 = await Listing.findOne({title: "Luxury Glamping at Thiksey"});
    console.log(listing1, listing2);
    res.render("filters/camping.ejs", {listing1, listing2});
}

module.exports.farmsListing = async(req, res) => {
    let listing = await Listing.findOne({title: "Meadowview Country Retreat"});
    console.log(listing);
    res.render("filters/farms.ejs", {listing});
}

module.exports.arcticListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Beachfront Paradise"});
    let listing2 = await Listing.findOne({title: "Treetop Haven"});
    console.log(listing1, listing2);
    res.render("filters/arctic.ejs", {listing1, listing2});
}

module.exports.breakfastsListing = async(req, res) => {
    let listing = await Listing.findOne({title: "Crescent Lily Bliss"});
    console.log(listing);
    res.render("filters/breakfasts.ejs", {listing});
}

module.exports.boatsListing = async(req, res) => {
    let listing1 = await Listing.findOne({title: "Dominican Bliss"});
    let listing2 = await Listing.findOne({title: "Moraine Lake Serenity"});
    let listing3 = await Listing.findOne({title: "Adriatic Serenity"});
    console.log(listing1, listing2, listing3);
    res.render("filters/boats.ejs", {listing1, listing2, listing3});
}

module.exports.domesListing = async(req, res) => {
    let listing = await Listing.findOne({title: "Celestial Ice Castle"});
    console.log(listing);
    res.render("filters/domes.ejs", {listing});
}

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    const listing = allListings;
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing you are trying to access does not exit!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing })
}

module.exports.createListing = async(req, res, next) => {
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
        
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename}; 
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!")
    res.redirect("/listings");
}

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you are trying to access does not exit!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
    
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    // Find the listing to update
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Backup the existing geometry
    const originalGeometry = listing.geometry;

    // Handle location and geometry updates
    if (req.body.listing.location) {
        // If location is provided, re-fetch the geometry from Mapbox
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1
            })
            .send();

        // Assign new geometry
        listing.geometry = response.body.features[0].geometry;
    } else {
        // If no new location, retain original geometry
        listing.geometry = originalGeometry;
    }

    // Merge other fields (including image)
    Object.assign(listing, req.body.listing);

    if (req.file) {
        // Update the image if a new file is uploaded
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    console.log("Before saving, listing geometry is:", listing.geometry);

    await listing.save();
    req.flash("success", "Listing Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
}