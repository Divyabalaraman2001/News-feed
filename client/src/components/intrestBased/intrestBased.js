import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsFeedcatogoryvise from "../newsfeed/catgoryvise";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

const interestsList = ["Sports", "Politics", "Technology", "Entertainment"];

const UserPreferences = ({ userId }) => {
  const  _id  = JSON.parse(localStorage.getItem("user"))?._id;

  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    axios.get(`/fetch/userprefernce/${_id}`).then((response) => {
      setSelectedInterests(response.data.preferences);
    });
  }, [_id]);

  const handleCheckboxChange = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const savePreferences = () => {
    axios
      .post(
        `/userprefernce/${_id}`,
        { preferences: selectedInterests },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        alert("Preferences updated!");
      });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h2 className="mb-3">Select Your Interests</h2>
        <Form>
          <Row className="mb-3">
            {interestsList.map((interest) => (
              <Col xs={6} key={interest}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedInterests.includes(interest)}
                      onChange={() => handleCheckboxChange(interest)}
                      sx={{
                        color: "#1976D2",
                        "&.Mui-checked": {
                          color: "#1976D2",
                        },
                      }}
                    />
                  }
                  label={interest}
                />
              </Col>
            ))}
          </Row>
        </Form>
        <Button
          variant="primary"
          onClick={savePreferences}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            transition: "0.3s",
          }}
          className="mt-3"
        >
          Save Preferences
        </Button>
      </Box>

      {/* Display selected categories */}
      <div className="mt-4">
        {selectedInterests.map((interest) => (
          <Card
            key={interest}
            className="mb-3 mx-auto"
            style={{
             
              padding: "15px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <h3 className="text-center">❤️ {interest}</h3>
            <NewsFeedcatogoryvise category={interest} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default UserPreferences;
