const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const imgBbApiKey = '83c90d2ce614fbdebe13c67853acdce9';

async function uploadImageToImgBB(imagePath) {
  try {
    // Read the image file as a stream
    const imageStream = fs.createReadStream(imagePath);

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', imageStream);

    // Make a POST request to ImgBB API
    const response = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${imgBbApiKey}`, formData, {
      headers: {
        ...formData.getHeaders(), // Include necessary headers from FormData
      },
    });

    // Check if the API request was successful
    if (response.data && response.data.status === 200) {
      // Extract the URL of the uploaded image
      const imageUrl = response.data.data.url;
      console.log('Image uploaded successfully. URL:', imageUrl);
    } else {
      console.error('Error uploading image to ImgBB:', response.data.error.message);
    }
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error.message);
  }
}

// Specify the path to the image file you want to upload
const imagePath = 'assets/image.png';

// Call the function to upload the image
uploadImageToImgBB(imagePath);
