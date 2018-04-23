var express = require("express")
var bodyParser = require("body-parser-json")


function createServer (port) {
  var sparkController = require('./app').sparkController
  // initialize express instance and add middlewares
  server = express()
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true}));

  // fire up server
  server.listen(port, console.log('Server is now UP and listening on port ' + port))

  // require the main routes function passing the server as argument
  require("./routes").routes(server)

};


module.exports = {
  createServer: createServer
}