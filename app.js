const https = require('https');
// Storing API key in api.json
const api = require('./api.json');
// Grab all the arguments inputted in console
const args = process.argv;
let stockName = args[2];
let price = 0;

const displayStock = () => {
  console.log(`The current stock price of ${stockName} is $${parseFloat(price).toFixed(2)}`);
};

// Run a function for custom stock search
const stockPrice = (stock) => {
  // Create a variable for each stock url
  const customUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${api.key}`;
  // Do a https request and recieve data in return
  https.get(customUrl, (response) => {
    // Concatenate the full body of the response
    let fullBody = '';
    response.on('data', (data) => {
      fullBody += data.toString();
    }).on('end', () => {
      // Parse the string response to a JSON object
      const parsed = JSON.parse(fullBody);
      // Grab the specific object property that contains all the price details
      const arrayOfSeries = parsed['Time Series (5min)'];
      let arr = [];
      // Push all the objects into an array
      for(let element in arrayOfSeries){
        arr.push(arrayOfSeries[element]);
      }
      // Log the final data to the console
      price += arr[arr.length - 1]['4. close'];
      displayStock();
    });
  });
};

stockPrice(args[2]); // The third argument contains the required one
