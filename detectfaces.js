const chokidar = require('chokidar');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { Client } = require('@elastic/elasticsearch');

// Elasticsearch client
//const client = new Client({ node: 'http://localhost:9200' }); // Update with your Elasticsearch instance

const client = new Client({
  cloud: {
    //id: "MyDeploymentFS:d2VzdGV1cm9wZS5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo0NDMkZGM4NDJiYTBhY2NiNDQ3ZGJlYWExZWJiZGM3Mzc4MDckZDdmODE1MzljYmIyNDg4NDgzMzEzMzIzMDFjYzBiYjI="
    id: "eu-face-dev1:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbzo0NDMkNzJiZTdhYzI3NjhjNDllOGI5OWU3YmMzNWU0MGI0NmYkMDFlY2VkMzFmNjUzNGQ1MzhiNTc3MzFmZDllYmYzMGQ="
  },
  auth: {
    username: "elastic",
    //password: "Cnv3w9pwFlWncFQGuQhCiYK6"
    password: "2Q03U6gk00C3vun4dj610MKA"
  }
})



// Directory to monitor
const directoryToWatch = './images';

// Watcher using chokidar
const watcher = chokidar.watch(directoryToWatch, {
  ignored: /^\./,
  persistent: true,
});

// Function to encode image to base64
function encodeImageToBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Function to post file for recognition
async function postFileForRecognition(filePath) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('http://116.202.208.7:8001/api/v1/recognition/recognize?face_plugins=landmarks,gender,age,pose', formData, {
      headers: {
        ...formData.getHeaders(),
        'x-api-key': 'e7d643c1-7c55-433d-a8d0-1fa4d3b6fcc6',
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log('Recognition response:', JSON.stringify(response.data, null, 2));
    handleRecognitionResponse(response.data, filePath);

  } catch (error) {
    console.error('Error in recognition request:', error);
  }
}

// Function to handle the recognition response
async function handleRecognitionResponse(data, filePath) {
  const similarity = data.result[0]?.subjects[0]?.similarity;
  const firstsubject =  data.result[0]?.subjects[0];
  const othersubjects =  data.result[0]?.subjects;

  const age = data.result[0]?.age;
  const gender = data.result[0]?.gender;

  const pose = data.result[0]?.pose;

  console.log("similiarity = ",similarity);
  if (similarity && similarity > 0.9) {
    try {
      const timestamp = new Date().toISOString();
      const filename = path.basename(filePath);
      const base64Image = await encodeImageToBase64(filePath);

      // Post to Elasticsearch
      await client.index({
        index: 'face-recognition',
        document: {
          tvChannel : filename.split('_')[0],
          firstsubject,
          othersubjects,
          filename,
          timestamp,
          similarity,
          age,
          gender,
          pose,
          image: base64Image,
          timestamp: Date.now()
        }
      });

      console.log(`Image ${filename} with similarity ${similarity} indexed in Elasticsearch.`);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }
}

// On file added event
watcher.on('add', async filePath => {
  console.log('File added:', filePath);

  await postFileForRecognition(filePath);

  // Delete file after processing
  fs.unlink(filePath, err => {
    if (err) console.error('Error deleting file:', err);
    else console.log('File deleted:', filePath);
  });
});

console.log('Watching for files in', directoryToWatch);
