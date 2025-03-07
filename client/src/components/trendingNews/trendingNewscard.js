import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form, InputGroup, Accordion } from "react-bootstrap";
import { Favorite, ChatBubble, Share, ContentCopy } from "@mui/icons-material";
import axios from "axios";
import { AccordionDetails, AccordionSummary, CardContent, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TendingNewsCard({ title, description, url, urlToImage, like, id, commentses }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const [commentModal, setcommentModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const  userName  = JSON.parse(localStorage.getItem("user"))?.userName
  console.log(userName);
  console.log(commentses);


  // Function to handle the share button click
  const handleShareClick = () => {
    setShareLink(url);
    setShowShareModal(true);
  };
  console.log(like);

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };


  // /terending/news/:id

  const sendcomment = async () => {

    const comment = {
      user: userName,
      text: comments
    }


    const { data } = await axios.put("http://localhost:5000/terending/news/" + id, comment)

    console.log(data);




    console.log(id);

    alert(comments)
    alert("comment  added!");



  };



  useEffect(() => {



  }, [likes])

  const likebutton = async (datas) => {


    setLikes(likes ? 0 : likes + 1)

    console.log({ ...datas, likes });



    const { data } = await axios.post("http://localhost:5000/terending/news", { ...datas, likes: likes == 0 ? 1 : 0, })

    console.log(data);


    //http://localhost:5000/terending/news

    window.location.reload()




  }




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
                className={likes ? "text-danger" : ""}

                onClick={(e) => likebutton({ urlToImage, description, title, url })}
              >
                <Favorite color={likes ? "red" : "black"} /> {like}
              </Button>
            </Col>
            <Col>
              <Button
                variant="link"
                className="text-primary"
                onClick={() => setcommentModal(true)}
              >
                <ChatBubble /> {commentses.length}
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

      {/* comment Modal */}
      <Modal show={commentModal} onHide={() => setcommentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          {commentses?.map(com => {
            return <> 
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
      {commentses?.map((com, index) => (
        <Card key={index} sx={{ maxWidth: 500, boxShadow: 3, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              {com?.date}
            </Typography>
            <Accordion sx={{ boxShadow: "none", backgroundColor: "#fff" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1" fontWeight="bold">
                  {com?.user}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {com?.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
            </>
          })}



          <InputGroup>
            <Form.Control type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
            <Button variant="primary" onClick={sendcomment}>
              <ContentCopy /> send the Feedback
            </Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TendingNewsCard;
