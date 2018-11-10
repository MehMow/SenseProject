var request = require('request');
var bodyParser = require('body-parser'); //allows the use of req.body in POST request

const express = require('express'); //used as routing framework
const app = express(); //creates an instance of express
const server = require('http').createServer(app); //creates an HTTP server instance

const path = require('path'); //Node.js module used for getting path of file
const logger = require('morgan'); //used to log in console window all request
app.use(logger('dev')); //debugs logs in terminal

const PORT = 3000;

//-------------------------Express JS configs-----------------------------//
// view engine setup
// call req.render(FileName) below to run
app.set('views', './views'); //says where in root directory the find files (./views)
app.set('view engine', 'ejs'); //says which engine being used (ejs)

app.use(express.static(path.join(__dirname, 'public'))); //sets all static file calls to 

//-------------------------Routing Calls-----------------------------//
app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/lyrics', function(req, res) {
    
     
  request({
    "url": req.body.url,
    "headers" : {
      "Authorization" : "Bearer lrAOh-ZubBQPMEc411VLuG2wIXUNZ3zWyJ7VnLA_96mijnGcFcLuFqik6AkQoGTu"
    }
  }, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.\
  res.send(body);
});
  
 
});


// ------------ Server Setup --------------//

/**
 * Get port from environment and store in Express.
 */

// Change Port here
// process.env.PORT used with services like Azure or AWS who give port
var port = normalizePort(process.env.PORT || PORT);
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}