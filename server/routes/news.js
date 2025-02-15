const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const News = require('../model/news');
const axios = require("axios");


require("../db/connect");

// fetchelatestNews

router.get('/fetchelatestNews', async (req, res) => {
    try {
  
 
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

      await News.deleteMany()
  
     const article= await News.insertMany(newsData);
     console.log(article);
     
      res.json({ message: "News fetched and stored successfully",articles:article });
    } catch (error) {
      res.status(500).json({ error: "Error fetching news" });
    }
  } );

// // Login
// router.post('/login', );

// // Profile route
// router.get('/profile', )
// router.get('/logout', )
module.exports = router;
