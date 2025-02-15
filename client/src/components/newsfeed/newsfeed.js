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
import { Favorite, ChatBubble, Share, ContentCopy } from "@mui/icons-material";
import axios from "axios";
import "./NewsFeed.css"; // Import the CSS file for styles

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <Container className="mt-4" >
      <h2 className="text-center mb-4">📰 Latest News</h2>
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
