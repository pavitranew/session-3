const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    res.redirect('/');
  });
});

app.get('*', function(req, res){
  res.send(`
    <h1>Oopsy! Page not found</h1>
    `)
})

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});