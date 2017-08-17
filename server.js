var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var db_object = require('./db_latest_search.js');
var Bing = require('node-bing-api')({ accKey: process.env.AZURE_KEY_2 });
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI);
//usage /db?term=something&offset=number
app.get('/db?', function(
  request,
  response,
  next
) {
  var st = request.query.term;
  var off = request.query.off;
  var data = new db_object({
    searchterm: st,
    offset: off 
  });
  data.save(function(err) {
    if (err) {
      return response.send(
        "An error occurred while saving data in the database"
      );
    }
    else {
      //response.send('your search request was correctly saved');
      return response.json(data);
    }
  });
});
//usage /bing?q=something&off=number
app.get('/bing?',function(request,response,next){
  var q = request.query.q;
  var off = request.query.off
  console.log(q);
  Bing.images(q, {
  count: off,   // Number of results (max 50) 
  offset: 0    // Skip first 0 result 
  }, function(error, res, body){
    return response.send(body.value)
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
