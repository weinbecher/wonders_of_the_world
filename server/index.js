const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const createRouter = require('./helpers/create_router.js');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('wonders_of_the_world');
  const wondersCollection = db.collection('wonders');
  const wonderRouter = createRouter(wondersCollection);
  app.use('/api/wonders', wonderRouter);

  const quizCollection = db.collection('quiz');
  const quizRouter = createRouter(quizCollection);
  app.use('/api/quiz', quizRouter);
})
.catch(console.err);

// Handle production
if(process.env.NODE_ENV === 'production'){
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(3000, function(){
  console.log(`app running on port ${this.address().port}`);
})
