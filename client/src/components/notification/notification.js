import React, { useState } from "react";
import { motion } from "framer-motion";
import { List, ListItem, ListItemText, Badge, IconButton, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Container, Card } from "react-bootstrap";

const notificationsData = [
  { id: 1, type: "favorite", message: "New article from your favorite author!", icon: <FavoriteIcon color="error" /> },
  { id: 2, type: "unread", message: "You have 3 unread articles!", icon: <NotificationsIcon color="primary" /> },
  { id: 3, type: "trending", message: "Trending: AI is revolutionizing the industry!", icon: <StarIcon color="warning" /> }
];

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  return (
    <Container className="mt-5">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 150 }}>
        <Card className="shadow-lg p-4 border-0 rounded">
          <h3 className="text-center mb-3 fw-bold">
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon fontSize="large" />
            </Badge>
            Notifications
          </h3>
          <List>
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem>
                  <IconButton>{notif.icon}</IconButton>
                  <ListItemText primary={notif.message} />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </motion.div>
    </Container>
  );
};

export default NotificationSystem;
