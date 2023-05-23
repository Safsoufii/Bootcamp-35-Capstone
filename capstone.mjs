const getCityInfo = async (city) => {
    // URL to retrieve city information from WFT Geo DB API
    const cityApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions`;
    // URL to retrieve weather information from Weatherbit API
    const cityWeatherUrl = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lang=en&lon=28.05&lat=-26.20`;
  
    try {
      // Make a GET request to the city API URL
      const cityRes = await fetch(cityApiUrl, {
        method: "GET",
        headers: {
          // Add the API key and host to the request headers
          "X-RapidAPI-Key": "c29a54c56fmsh397b2cae1ef347dp16e1bajsn0710d7b0f79f",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      });
  
      // If the request is not successful (status code not in 200-299 range), throw an error
      if (!cityRes.ok) {
        throw new Error("City API request failed");
      }
  
      // Parse the JSON response from the city API
      const cityData = await cityRes.json();
  
      // If there is no data or no city is found, throw an error
      if (!cityData.data || cityData.data.length === 0) {
        throw new Error(`City "${city}" not found`);
      }
  
      // Make a GET request to the weather API URL
      const weatherRes = await fetch(cityWeatherUrl, {
        method: "GET",
        headers: {
          // Add the API key and host to the request headers
          "X-RapidAPI-Key": "c29a54c56fmsh397b2cae1ef347dp16e1bajsn0710d7b0f79f",
          "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      });
  
      // If the request is not successful (status code not in 200-299 range), throw an error
      if (!weatherRes.ok) {
        throw new Error("Weather API request failed");
      }
  
      // Parse the JSON response from the weather API
      const weatherData = await weatherRes.json();
  
      // Log the city information, population, elevation in meters, and current temperature in Celsius
      console.log(`City: ${city}`);
      console.log(`Population: ${cityData.data[0].population}`);
      console.log(`Elevation: ${cityData.data[0].elevationMeters}`);
      console.log(`Current temperature: ${weatherData.data[0].temp}°C`);
    } catch (error) {
      // Log the error message if an error occurs
      console.error(error.message);
    }
  };
  

getCityInfo("Johannesburg");
