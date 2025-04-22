import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import {
  TextField, MenuItem, CircularProgress, Container, Typography, Box,
  Select, FormControl, InputLabel, List, ListItem, ListItemText, Button, Grid
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [translatedArticles, setTranslatedArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [suggestions, setSuggestions] = useState([]);
  const [language, setLanguage] = useState('en');

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
    let url = `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=5&language=en&apiKey=330e87d7b7a04229acbf2a4de862c4e0`;
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

  const translateText = async (text, targetLang) => {
    if (targetLang === 'en' || !text?.trim()) return text;

    try {
      const response = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      }, {
        headers: { accept: 'application/json' }
      });

      return response.data.translatedText;
    } catch (error) {
      console.error(`Translation to ${targetLang} failed for text:`, text);
      return text; // Fallback to English if translation fails
    }
  };

  const translateArticles = async (articlesData, lang) => {
    if (lang === 'en') {
      setTranslatedArticles(articlesData);
      return;
    }

    const translated = await Promise.all(articlesData.map(async article => ({
      ...article,
      title: await translateText(article.title, lang),
      description: await translateText(article.description, lang)
    })));
    setTranslatedArticles(translated);
  };

  useEffect(() => {
    const getNews = async () => {
      const preferredLang = language;
      let url = `https://newsapi.org/v2/everything?q=${query || props.category}&sortBy=${sortBy}&language=${preferredLang}&apiKey=330e87d7b7a04229acbf2a4de862c4e0`;

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles.length > 0) {
          setArticles(data.articles);
          await translateArticles(data.articles, language);
        } else if (language !== 'en') {
          const fallbackUrl = `https://newsapi.org/v2/everything?q=${query || props.category}&sortBy=${sortBy}&language=en&apiKey=330e87d7b7a04229acbf2a4de862c4e0`;
          const fallbackResponse = await fetch(fallbackUrl);
          const fallbackData = await fallbackResponse.json();
          setArticles(fallbackData.articles);
          await translateArticles(fallbackData.articles, language);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getNews();
  }, [query, props.category, sortBy, language]);

  return (
    <Container>
      <Typography variant="h3" className="text-center mt-4" gutterBottom>
        Top Stories
      </Typography>

      <Box display="flex" justifyContent="center" my={3} sx={{ fontFamily: '"Times New Roman", "Mukta", serif' }}>
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
            sx={{
              ml: { xs: 0, sm: 2 },
              mt: { xs: 2, sm: 0 },
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #6b73ff, #000dff)'
            }}
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

      <Box display="flex" justifyContent="space-between" my={3}>
        <FormControl variant="outlined" sx={{ minWidth: 150, boxShadow: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="publishedAt">Latest</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="relevancy">Relevance</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150, boxShadow: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <MenuItem value="en">English</MenuItem>
       
            <MenuItem value="hi">Hindi</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          translatedArticles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <NewsCard
                title={article.title}
                urlToImage={article.urlToImage}
                url={article.url}
                description={article.description}
                likeButton={<Button variant="outlined" color="primary">Like</Button>}
                commentButton={<Button variant="outlined" color="secondary">Comment</Button>}
                shareButton={<Button variant="contained" color="success">Share</Button>}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default News;
