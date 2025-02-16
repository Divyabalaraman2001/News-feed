const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const News = require('../model/news');
const axios = require("axios");
const UserPreference = require('../model/userpreference');


require("../db/connect");

// fetchelatestNews

router.get('/fetchelatestNews', async (req, res) => {
    try {
  
 
      // const response = await axios.get(
      //   `https://newsapi.org/v2/everything?q=tesla&from=2025-01-15&sortBy=publishedAt&apiKey=1856338024f14a45ae5b86777c7ae466`
      // );
  
      
      // console.log(response);
      
  
      // const newsData = response.data.articles.map((article) => ({
      //     title: article.title,
      //     description: article.description,
      //     url: article.url,
      //     category: "General",
      //     publishedAt: article.publishedAt,
      //     author: article.author || "Unknown",
      //     source: {
      //       id: article.source?.id || null,
      //       name: article.source?.name || "Unknown Source",
      //     },
      //     urlToImage: article.urlToImage || "https://via.placeholder.com/150", // Fallback image
      //     content: article.content || "No content available",
      //   }));

      // await News.deleteMany()
  
      // // console.log(article);
      // const categories = ["Sports", "Business", "General", "Technology"];
      
      
      // function updateProductCategories(products, categories) {
      //   return products.map((product, index) => ({
      //     ...product,
      //     category: categories[index % categories.length]  // Assign category in a round-robin manner
      //   }));
      // }

      // const updatedcategoriesData=updateProductCategories(newsData,categories)
      
      // const article= await News.insertMany(updatedcategoriesData);

      const article= await News.find()

     
      res.json({ message: "News fetched and stored successfully",articles:article });
    } catch (error) {
      res.status(500).json({ error: "Error fetching news" });
    }
  } );

// // Login
router.post('/userprefernce/:userId',async (req,res)=>{
  const { userId } = req.params;
  const { preferences } = req.body;

  let userpreference = await UserPreference.findOne({ userId });

  if (userpreference) {
    // Update existing user preferences
    userpreference.preferences = preferences;
  } else {
    // Create a new user with preferences
    userpreference = new UserPreference({ userId, preferences });
  }

  await userpreference.save();
  res.json({ message: "Preferences saved successfully!" });


}
 );


 router.get('/fetch/userprefernce/:userId',async (req,res)=>{

  const { userId } = req.params;
  console.log(userId);
  
 

 
  const userpreference = await UserPreference.findOne({ userId: userId });
  res.json(userpreference || { preferences: [] });

}
 );


//  app.get("/api/preferences/:userId", async (req, res) => {
//   const user = await User.findOne({ userId: req.params.userId });
//   res.json(user || { preferences: [] });
// });



module.exports = router;
