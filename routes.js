var sparkController = require('./app').sparkController
var prepareSparkBot = require('./helpers/spark').prepareSparkBot
var getTickets = require('./controllers/web/api').getTickets
var createTicket = require('./controllers/web/api').createTicket

function routes (webserver) {

  // fire up bot instance passing it through prepareSparkBot
  var sparkbot = prepareSparkBot(sparkController.spawn({}));

  // ------------ SPARK ROUTES -------------------------//

  // POST method where we handoff logic to botkit controller
  webserver.post('/spark-api', (req,res) => {

    res.sendStatus(200);
    sparkController.handleWebhookPayload(req,res,sparkbot)

  })
  // GET method returns the information of the spark interface
  webserver.get('/spark-api', (req,res) => {

    res.status(200);
    res.send(sparkbot.commons);

  })

  // ------------------------ WEB INTERFACE ROUTES -------------------------//

  // GET method used to fetch support tickets, returns "n" number of results
  webserver.get('/tickets', (req,res) => {
    res.status(200);
    getTickets(req.query.n)
    .then(tickets => {
      res.send(tickets)
    })
    .catch(err => {
      console.log(err)
    })

  })
  // POST method used to create support tickets
  webserver.post('/save_ticket', (req,res) => {
    console.log('received body: ', req.body)
    res.status(200);
    createTicket(req.body)
    .then(ticket => {
      console.log('created ticket: ', ticket)
      res.send(ticket)
    })
    .catch(err => {
      console.log(err)
    })
  })

}

module.exports = {
  routes: routes
}

