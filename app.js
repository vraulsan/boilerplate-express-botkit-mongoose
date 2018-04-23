//
// This file initializes botkit controllers and calls the create express
// function in order to fire up the server
//

// load environments and requirements
var env = require('node-env-file')
env(__dirname + '/.env');
// load Botkit core requirement and mongoose
var Botkit = require('botkit');
var mongoose = require('mongoose');


// initialize spark botkit controller as sparkController
// I will export this, then import it in the routes definition
var sparkController = Botkit.sparkbot({
  log: true,
  public_address: process.env.NGROK+'/spark-api',
  ciscospark_access_token: process.env.SPARK_TOKEN,
  webhook_name: process.env.WEBHOOK_NAME
});

exports.sparkController = sparkController

/* Here we can do the same for say, the Twilio API
var smsController = Botkit.twiliosmsbot({
  account_sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_number: process.env.TWILIO_NUMBER,
  debug: true
})
*/

// check spark webhooks and update or create as needed
require('./helpers/spark').checkSparkWebhooks(sparkController)


// start the server
require('./server').createServer(process.env.EXPRESS_PORT);


// load the sparkbot skills
require("fs").readdirSync('./controllers/spark').forEach(file => {
  require('./helpers/spark').loadSparkSkills(file, sparkController)
});

// connect to mongoose
mongoose.connect(process.env.MONGO_URL, err => {
  if (err) {
    console.log('*** Unable to connect with mongoose: ***\n\n' + err);
    process.exit(1);
  }
  console.log('Mongoose is now connected to ' + process.env.MONGO_URL)
});




