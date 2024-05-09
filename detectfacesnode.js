require('dotenv').config();
const chokidar = require('chokidar');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');


// Securely load environment variables
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB client
const client = new MongoClient(MONGO_URI);
const database = client.db('imageRecognition')
const collection = database.collection('recognitions')

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
    const response = await axios.post(`${API_URL}?face_plugins=landmarks,gender,age,pose`, formData, {
      headers: {
        ...formData.getHeaders(),
        'x-api-key': API_KEY,
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
  // const collection = await connectMongo();
  const similarity = data.result[0]?.subjects[0]?.similarity;
  const firstsubject = data.result[0]?.subjects[0];
  const othersubjects = data.result[0]?.subjects;

  const name = firstsubject.subject;
  const age = data.result[0]?.age;
  const gender = data.result[0]?.gender;
  const pose = data.result[0]?.pose;
  
  console.log("similiarity = ",similarity);

  if (similarity && similarity > 0.9) {
    try {
      const timestamp = new Date().toLocaleString(); // toISOString()
      const timestamp2 = new Date()
      const filename = path.basename(filePath);
      const base64Image = await encodeImageToBase64(filePath);
      // Insert document to MongoDB
      await collection.insertOne({
        tvChannel: filename.split('_')[0],
        firstsubject,
        othersubjects,
        filename,
        timestamp,
        timestamp2,
        name,
        // date: timestamp.split('T')[0],
        // time: timestamp.split('T')[1].split('Z')[0],
        date: timestamp.split(',')[0],
        time: timestamp.split(', ')[1],
        month: (timestamp2.getMonth() + 1).toString(),
        year: timestamp2.getFullYear().toString(),
        similarity,
        age,
        gender,
        pose,
        image: base64Image,
        // timestamp: Date.now()
      });

      console.log("==============================================================",new Date().toISOString());

      console.log(`Image ${filename} with similarity ${similarity} inserted into MongoDB.`);
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
