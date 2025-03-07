const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const News = require('../model/news');
const axios = require("axios");
const UserPreference = require('../model/userpreference');
const TrendingNews = require('../model/trending');
const User = require('../model/user');
const { sendVerificationEmail } = require('../utils/email');
// const TrendingNews = require('../model/trending');


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

    const articles = await News.find()


    res.json({ message: "News fetched and stored successfully", articles: articles });
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

// // Login
router.post('/userprefernce/:userId', async (req, res) => {
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


router.get('/fetch/userprefernce/:userId', async (req, res) => {

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


router.post("/terending/news", async (req, res) => {

  try {
    console.log(req.body); // Debugging: Check if req.body is received

    const trending = req.body;

    // Validate required fields before saving
    if (!trending.title || !trending.description || !trending.url) {
      return res.status(400).json({ error: "Missing required fields" });
    }


    let trendingNews;

    const check = await TrendingNews.findOne({ title: trending.title });
    trendingNews = new TrendingNews(trending);
    if (check) {

      check.likes += trending.likes
      check.save()

      return res.status(200).json({ message: "likes  added" })

    }

    await trendingNews.save();



    res.status(201).json(trendingNews); // Use 201 for successful resource creation
  } catch (error) {
    console.error("Error saving trending news:", error);
    res.status(500).json({ error: "Internal server error" });
  }

})




router.put("/terending/news/:id", async (req, res) => {

  try {
    console.log(req.body); // Debugging: Check if req.body is received

    const comment = req.body;

    

    // Validate required fields before saving
    if (!comment.user || !comment.user) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let trendingNews;
    const check = await TrendingNews.findOne({ _id: req.params.id });
    // trendingNews = new TrendingNews(trending);
    if (check) {

      check.comments.push(comment)
      check.save()

      return res.status(200).json({ message: "comment  added" })

    } else {
      return res.status(400).json({
        message: "failed"
      })
    }


    // Use 201 for successful resource creation
  } catch (error) {
    console.error("Error saving trending news:", error);
    res.status(500).json({ error: "Internal server error" });
  }

})




const getTrendingNews = (newsData) => {
  return newsData
    .sort((a, b) => b.likes - a.likes); // Sort in descending order of likes
};


router.get("/trending/news", async (req, res) => {
  try {




    const getnews = await TrendingNews.find();
    const trendingnews = getTrendingNews(getnews);
    const users = await User.find();

    users.map( async(user)=>{

      console.log(user.email);

      await sendVerificationEmail(user.email,trendingnews[0].title,trendingnews[0].description,trendingnews[0].url)
      await sendVerificationEmail(user.email,trendingnews[1].title,trendingnews[1].description,trendingnews[1].url)
      

    })

    res.status(200).json(trendingnews);
  } catch (error) {
    console.error("Error fetching trending news:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


module.exports = router;
