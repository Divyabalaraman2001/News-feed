import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Favorite, ChatBubble, Share } from "@mui/icons-material";

function NewsCard({ title, description, url, urlToImage }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden my-3">
      <Card.Img variant="top" src={urlToImage} className="news-img" />

      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <Button variant="outline-primary" href={url} target="_blank">
          Read More
        </Button>
      </Card.Body>

      <Card.Footer>
        <Row className="text-center">
          <Col>
            <Button
              variant="link"
              className="text-danger"
              onClick={() => setLikes(likes + 1)}
            >
              <Favorite /> {likes}
            </Button>
          </Col>
          <Col>
            <Button
              variant="link"
              className="text-primary"
              onClick={() => setComments(comments + 1)}
            >
              <ChatBubble /> {comments}
            </Button>
          </Col>
          <Col>
            <Button
              variant="link"
              className="text-success"
              onClick={() => setShares(shares + 1)}
            >
              <Share /> {shares}
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default NewsCard;
