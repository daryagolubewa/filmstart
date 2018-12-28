import express from 'express';

const fetch = require('node-fetch');

const router = express.Router();

router.post('/', async (req, res) => {
  const city = req.body.cityName;
  const location = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
  const locationData = await location.json();
  const locationId = await locationData[0].woeid;
  const locationWeather = await fetch(`https://www.metaweather.com/api/location/${locationId}`);
  const weatherData = await locationWeather.json();
  res.status(200).json(weatherData);
});

router.post('/details', async (req, res) => {
  const city = req.body.cityName;
  const location = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
  const locationData = await location.json();
  const locationId = await locationData[0].woeid;
  const locationWeather = await fetch(`https://www.metaweather.com/api/location/${locationId}`);
  const weatherData = await locationWeather.json();
  res.status(200).json(weatherData);
});


export default router;
