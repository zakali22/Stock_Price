const https = require('https');
// Storing API key in api.json
const api = require('./api.json');

// Run a function for custom stock search
const stockPrice = (stock) => {
  // Create 
  const customUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${api.key}`;

};
