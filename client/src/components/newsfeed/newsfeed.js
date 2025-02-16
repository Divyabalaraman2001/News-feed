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
  Modal,
  ListGroup,
} from "react-bootstrap";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Favorite, ChatBubble, Share, ContentCopy } from "@mui/icons-material";
import axios from "axios";
import "./NewsFeed.css"; // Import the CSS file for styles

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [interactions, setInteractions] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchelatestNews")
      .then((response) => {
        setNews(response.data.articles);
        setFilteredNews(response.data.articles);

        const initialInteractions = {};
        response.data.articles.forEach((article) => {
          initialInteractions[article._id] = { likes: 0, comments: 0, shares: 0 };
        });
        setInteractions(initialInteractions);

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const handleInteraction = (articleId, type) => {
    setInteractions((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        [type]: prev[articleId][type] + 1,
      },
    }));
  };

  const handleShareClick = (url) => {
    setShareLink(url);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  // Filter and Sort Logic
  useEffect(() => {
    let filtered = news;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((article) =>
        article.title==null?"A":  article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter((article) => article.category === category);
    }

    // Sorting
    if (sortOption === "latest") {
      filtered = filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else {
      filtered = filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    }

    setFilteredNews(filtered);
  }, [searchQuery, category, sortOption, news]);

  // Update search suggestions based on input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(query);
  
    setSearchQuery(query);
    console.log(news);
    
  
    if (query.length > 0) {
      const suggestions = news
        .filter((article) => article.title && typeof article.title === "string") // Ensure title is a valid string
        .map((article) => article.title.toLowerCase()) // Convert to lowercase safely
        .filter((title) => title.includes(query.toLowerCase())) // Perform search
        .slice(0, 5); // Show only top 5 suggestions
  
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };
  
  

  // Select a suggestion from the dropdown
  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    setSearchSuggestions([]);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📰 Latest News</h2>

      {/* Search & Filter Controls */}
      <Row className="mb-3">
        <Col md={4} className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchSuggestions.length > 0 && (
            <ListGroup className="search-suggestions">
              {searchSuggestions.map((suggestion, index) => (
                <ListGroup.Item key={index} action onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {filteredNews.map((article) => (
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
                  <CardContent className="zoom-effect">
                    <Typography variant="h6" className="news-title">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" className="news-description">
                      {article.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <IconButton onClick={() => handleInteraction(article._id, "likes")} color="error">
                    <Favorite />
                  </IconButton>
                  <IconButton onClick={() => handleInteraction(article._id, "comments")} color="primary">
                    <ChatBubble />
                  </IconButton>
                  <IconButton onClick={() => handleShareClick(article.url)} color="success">
                    <Share />
                  </IconButton>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share this News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control type="text" value={shareLink} readOnly />
            <Button variant="primary" onClick={copyToClipboard}>
              <ContentCopy /> Copy Link
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NewsFeed;

