import React, { useEffect, useState } from 'react';
// import NewsCard from './NewsCard';
import { TextField, MenuItem, CircularProgress, Container, Typography, Box, Select, FormControl, InputLabel, List, ListItem, ListItemText, Button, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import TendingNewsCard from './trendingNewscard';

function TrendingNews() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [suggestions, setSuggestions] = useState([]);



  
  

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 2) {
      await fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };



  const fetchSuggestions = async (searchTerm) => {
    let url = `http://localhost:5000/trending/news`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.articles.map(article => article.title));
    } catch (error) {
      console.log(error);
    }
  };

  const searchQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSuggestions([]);
  };

  useEffect(() => {
    const getNews = async () => {
    let url = `http://localhost:5000/trending/news`;
      
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, [query, sortBy]);

  return (
    <Container>
      <Typography variant="h3" className="text-center mt-4" gutterBottom>
        Top Stories
      </Typography>
      <Box display="flex" justifyContent="center" my={3}>
        <form onSubmit={searchQuery} className="d-flex w-100 flex-column flex-sm-row">
          <TextField 
            fullWidth 
            variant="outlined" 
            placeholder="Search topics, keywords, authors..." 
            value={search} 
            onChange={handleSearch} 
            sx={{ borderRadius: '8px', boxShadow: 2 }}
          />
          <Button 
            variant="contained" 
            type="submit" 
            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(45deg, #6b73ff, #000dff)' }}
          >
            Search
          </Button>
        </form>
      </Box>
      {suggestions.length > 0 && (
        <List className="bg-light border rounded p-2">
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} button onClick={() => setSearch(suggestion)}>
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
      )}
      <Box display="flex" justifyContent="flex-end" my={3}>
        <FormControl variant="outlined" sx={{ minWidth: 150, borderRadius: '8px', boxShadow: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="publishedAt">Latest</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="relevancy">Relevance</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          articles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TendingNewsCard
                title={article.title}
                urlToImage={article.urlToImage}
                url={article.url}
                description={article.description}
                like={article.likes}
                id={article._id}
                commentses={article.comments}
                likeButton={<Button variant="outlined" color="primary">Like</Button>}
                commentButton={<Button variant="outlined" color="secondary">Comment</Button>}
                shareButton={<Button variant="contained" color="success">Share</Button>}
                sx={{ boxShadow: 3, borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default TrendingNews;
