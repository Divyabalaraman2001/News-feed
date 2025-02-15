require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/newsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const newsSchema = new mongoose.Schema({
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

const News = mongoose.model("News", newsSchema);

// Fetch news from API and save to DB
app.get("/api/fetch-news", async (req, res) => {
  try {

    //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2025-01-15&sortBy=publishedAt&apiKey=1856338024f14a45ae5b86777c7ae466`
    );

    console.log(response);
    

    const newsData = response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        category: "General",
        publishedAt: article.publishedAt,
        author: article.author || "Unknown",
        source: {
          id: article.source?.id || null,
          name: article.source?.name || "Unknown Source",
        },
        urlToImage: article.urlToImage || "https://via.placeholder.com/150", // Fallback image
        content: article.content || "No content available",
      }));

    await News.insertMany(newsData);
    res.json({ message: "News fetched and stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

// Get news from MongoDB
app.get("/api/news", async (req, res) => {
  const news = await News.find();
  res.json(news);
});




app.listen(8000, () => {
  console.log("Server running on port 5000");
});
