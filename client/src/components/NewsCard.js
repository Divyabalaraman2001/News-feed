import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form, InputGroup } from "react-bootstrap";
import { Favorite, ChatBubble, Share, ContentCopy } from "@mui/icons-material";

function NewsCard({ title, description, url, urlToImage }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // Function to handle the share button click
  const handleShareClick = () => {
    setShareLink(url);
    setShowShareModal(true);
  };

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  return (
    <>
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
                onClick={handleShareClick}
              >
                <Share /> {shares}
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

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
    </>
  );
}

export default NewsCard;
