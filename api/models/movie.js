const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String},
    image: { type: String},
    titleImage: { type: String},
    thumbnail: { type: String },
    trailer: {type: String },
    video: { type: String },
    year: { type: String },
    genre: { type: String },
    ageLimit: { type: Number },
    isSeries:{type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model("movie", movieSchema);