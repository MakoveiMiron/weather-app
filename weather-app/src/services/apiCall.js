import { WEATHER_API_KEY, CITY_API_KEY } from "../constants/constants";

export default async function getCityWeather(cityName) {
    
    const countryCode = await getCountryCode(cityName)
    console.log(countryCode[0].country)
  
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName},${countryCode[0].country}?key=${WEATHER_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Return the data back when the promise resolves
  
    } catch (error) {
      console.error('Fetch error:', error.message);
      throw error; // Re-throw the error to handle it outside the function if needed
    }
  }

  export async function getCountryCode(cityName) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(cityName)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': `${CITY_API_KEY}`, // Replace with your actual API key
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error; 
    }
}
