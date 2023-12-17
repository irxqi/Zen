const axios = require('axios');

// Replace with your Imgflip username and password
const username = process.env.imgname;
const password = process.env.imgpswd;

// API endpoint for meme generation
const apiUrl = 'https://api.imgflip.com/caption_image';

// Template ID of the meme you want to use (get it from Imgflip website)
const templateId = '87743020';

// Text captions for the meme
const text0 = 'edge';
const text1 = 'nut';
const text2 = 'me';



// Request parameters
const params = {
  template_id: templateId,
  username: username,
  password: password,
  text0: text0,
  text1: text1,
  text2: text2,
};

// Make a POST request to the Imgflip API
axios.post(apiUrl, null, { params })
  .then(response => {
    // Parse the JSON response
    const data = response.data;

    // Check if the request was successful
    if (data.success) {
      // Get the URL of the generated meme
      const memeUrl = data.data.url;
      console.log(`Meme generated successfully! View it here: ${memeUrl}`);
    } else {
      console.error(`Error: ${data.error_message}`);
    }
  })
  .catch(error => {
    console.error('Error making API request:', error);
  });
