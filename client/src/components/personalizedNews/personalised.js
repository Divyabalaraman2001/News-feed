import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBookmark, FaRegBookmark, FaEye, FaEyeSlash } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const defaultArticles = [
  { _id: "1", title: "Tech Trends 2025", description: "Latest advancements in AI and Robotics.", bookmarked: false, read: false },
  { _id: "2", title: "Global Economy Updates", description: "Stock market fluctuations and their impact.", bookmarked: true, read: true },
  { _id: "3", title: "Sports Highlights", description: "Top performances from the latest tournaments.", bookmarked: false, read: false },
  { _id: "4", title: "Space Exploration", description: "NASA's new mission to Mars.", bookmarked: true, read: false },
];

const PersonalizedFeed = () => {
  const [articles, setArticles] = useState(defaultArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/feed")
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  const handleBookmark = async (id) => {
    setArticles(articles.map(article =>
      article._id === id ? { ...article, bookmarked: !article.bookmarked } : article
    ));
  };

  const chartData = {
    labels: articles.map(article => article.title.slice(0, 10) + "..."),
    datasets: [
      {
        label: "Trending Articles",
        data: articles.map(() => Math.floor(Math.random() * 100) + 1),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📌 Your Personalized News Feed</h1>

      {/* Trending Chart Section */}
      <div className="mb-5">
        <h5 className="text-center">🔥 Trending Articles</h5>
        <Bar data={chartData} />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {articles.map(article => (
            <motion.div 
              key={article._id} 
              className="col-md-6 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="card shadow-lg border-0 rounded">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{article.title}</h5>
                  <p className="card-text text-muted">{article.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={() => handleBookmark(article._id)}
                    >
                      {article.bookmarked ? <FaBookmark className="text-warning" /> : <FaRegBookmark />}
                    </button>
                    {article.read ? <FaEye className="text-success" /> : <FaEyeSlash className="text-danger" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeed;
