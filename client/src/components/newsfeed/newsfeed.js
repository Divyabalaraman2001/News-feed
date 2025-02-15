import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { Favorite, ChatBubble, Share } from "@mui/icons-material";
import axios from "axios";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [interactions, setInteractions] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchelatestNews")
      .then((response) => {
        console.log(response.data);
        setNews(response.data.articles);
        setFilteredNews(response.data.articles);

        // Initialize interaction states
        const initialInteractions = {};
        response.data.articles.forEach((article) => {
          initialInteractions[article._id] = { likes: 0, comments: 0, shares: 0 };
        });
        setInteractions(initialInteractions);

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  // 🔍 Search & Filter Functionality
  useEffect(() => {
    let filtered = news;

    // 🔹 Filter by category
    if (category !== "All") {
      filtered = filtered.filter((article) => article.category === category);
    }else if (category=="General") {
      filtered = filtered.filter((article) => article.category === category);
    }

    //General

    // 🔹 Filter by search query (Title, Description, Author)
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (article.author &&
            article.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 🔹 Sorting (Latest / Oldest)
    if (sortOption === "latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    } else if (sortOption === "oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      );
    }

    setFilteredNews(filtered);
  }, [searchQuery, category, sortOption, news]);

  // Handle interactions (Like, Comment, Share)
  const handleInteraction = (articleId, type) => {
    setInteractions((prev) => ({
      [articleId]: {
        ...prev[articleId],
        [type]: prev[articleId][type] + 1,
      },
    }));

    console.log(interactions);
  };

 
  

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📰 Latest News</h2>

      {/* 🔎 Search & Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search news by keyword, topic, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={3}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
        </Col>

        <Col md={3}>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            fullWidth
          >
            <MenuItem value="latest">Sort by Latest</MenuItem>
            <MenuItem value="oldest">Sort by Oldest</MenuItem>
          </Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => (
              <Col md={6} lg={4} key={article._id} className="mb-4">
                <Card className="shadow-lg h-100">
                  <CardActionArea href={article.url} target="_blank">
                    {article.urlToImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.urlToImage}
                        alt={article.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" className="mb-2">
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-3"
                      >
                        {article.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        📰 {article.source?.name || "Unknown Source"} | ✍️{" "}
                        {article.author || "Anonymous"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  {/* 📌 Like, Comment, Share Section */}
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <IconButton
                      onClick={() => handleInteraction(article._id, "likes")}
                      color="error"
                    >
                      <Favorite />
                      <span className="ms-1">{interactions[article._id]?.likes}</span>
                    </IconButton>

                    <IconButton
                      onClick={() => handleInteraction(article._id, "comments")}
                      color="primary"
                    >
                      <ChatBubble />
                      <span className="ms-1">{interactions[article._id]?.comments}</span>
                    </IconButton>

                    <IconButton
                      onClick={() => handleInteraction(article._id, "shares")}
                      color="success"
                    >
                      <Share />
                      <span className="ms-1">{interactions[article._id]?.shares}</span>
                    </IconButton>
                  </Card.Footer>

                  <Card.Footer className="text-muted text-center">
                    📅 {new Date(article.publishedAt).toLocaleDateString()}
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No results found for "{searchQuery}"</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default NewsFeed;
