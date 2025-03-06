import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form, InputGroup } from "react-bootstrap";
import { Favorite, ChatBubble, Share, ContentCopy } from "@mui/icons-material";
import axios from "axios";

function TendingNewsCard({ title, description, url, urlToImage,like }) {
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
console.log(like);

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };


  
  useEffect(()=>{

    

  },[likes])

  const likebutton= async(datas)=>{


    setLikes(likes? 0:likes+1)

    console.log({...datas,likes});


    const {data}=await axios.post("http://localhost:5000/terending/news",{...datas,likes:likes==0?1:0})

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
                className={likes?"text-danger":""}
               
                onClick={(e)=>likebutton({urlToImage,description,title,url})}
              >
                <Favorite color={likes?"red":"black"} /> {like}
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

export default TendingNewsCard;
