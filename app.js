// require the npm library
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));


// create a var for the app to be built using express
//app.use(express.static('app'));

//app.get('/', (req, res) => res.send('Hello World!')); // our first route
app.get('/', (req, res) => {
  db
    .collection('entries')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render('index.ejs', { entries: result });
    });
});
app.get('/watchlist', function(req, res) {
  // our second route
  res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `);
});
app.get('/entry/:name', function(req, res) {
    let name = req.params.name;
    res.send(`
      <h1>${name}</h1>
      <p>Commentary on ${name} will go here.</p>
      `);
  });

  app.get('/reverse/:name', (req, res) => {
    const reverse = [...req.params.name].reverse().join('');
    res.send(reverse)
  });

  app.post('/entries', (req, res) => {
    db.collection('entries').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('saved to database');
      res.redirect('/');
    });
  });
 
 
MongoClient.connect('mongodb://dbuser_root:justletmein1@ds129762.mlab.com:29762/paviwebdevelopment', (err, database) => {
    
    if (err) return console.log('merrorrrrr'+ err);
    db = database;
  
  });
    
  app.set('view engine', 'ejs');
  
  app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});