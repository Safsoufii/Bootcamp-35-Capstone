import fetch from 'node-fetch';

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));


const getCityInfo = async city => {
  const cityApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${Johannesburg}&limit=1&offset=0&countryIds=ZA`;
  const cityWeatherUrl = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=28.05&lat=-26.20`;

  try {
    const cityRes = await fetch(cityApiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': 'c29a54c56fmsh397b2cae1ef347dp16e1bajsn0710d7b0f79f'
      }
    });

    if (!cityRes.ok) {
      throw new Error('City API request failed');
    }

    const cityData = await cityRes.json();

    if (!cityData.data || cityData.data.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const weatherRes = await fetch(cityWeatherUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': 'c29a54c56fmsh397b2cae1ef347dp16e1bajsn0710d7b0f79f'
      }
    });

    if (!weatherRes.ok) {
      throw new Error('Weather API request failed');
    }

    const weatherData = await weatherRes.json();

    console.log(`City: ${Johannesburg}`);
    console.log(`Population: ${cityData.data[0].population}`);
    console.log(`Elevation: ${cityData.data[0].elevation}`);
    console.log(`Current temperature: ${weatherData.data[0].temp}°C`);
  } catch (error) {
    console.error(error.message);
  }
};

getCityInfo('Johannesburg');
