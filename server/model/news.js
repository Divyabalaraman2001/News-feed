const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  category: String,
  publishedAt: String,
  author: String,
  source: {
    id: String,
    name: String
  },
  urlToImage: String,
  content: String
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
