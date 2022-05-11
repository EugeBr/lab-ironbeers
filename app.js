const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
//* ROUTE FOR GETTING ALL THE BEERS AND IT'S RENDERED ON "/BEERS"
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersData => {
    res.render('beers', {beersData});
  })
  .catch(error => console.log(error));
});

//* ROUTE FOR GETTING A RANDOM BEER AND IT'S RENDERED ON "/RANDOM-BEER"
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeer => {
  res.render('random-beer', {randomBeer});
  })
  .catch(error => console.log(error));
});

//* ROUTE FOR GETTING DETAILS OF A SPECIFIC BEER AND IT'S RENDERED ON "/BEERS/someBeerIdGoesHere"
app.get('/beers/:beerId', (req, res) => {
  console.log('params:', req.params);
  const { beerId } = req.params.beerId;
  punkAPI
  .getBeer(beerId)
  .then(beerPick => {
    console.log(beerPick);
   res.render('beer-pick', {beerPick}); 
  })
   .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
