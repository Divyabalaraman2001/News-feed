const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  url: { type: String, required: true },
  urlToImage: { type: String, default: "sdfsfsfsf" },
  publishedAt: { type: Date, default: Date.now }
});

const TrendingNews= mongoose.model("TrendingNews", newsSchema);

module.exports =TrendingNews
