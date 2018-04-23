//* This is the line or queue intent
//* Displays tickets in the line/queue

module.exports = function (controller) {
  // import the Ticket schema, we will need to to query the database
  var Ticket = require("../../models/ticket").Ticket;

  controller.hears(["queue", "line"], 'direct_message,direct_mention', function (bot, message) {
    // i will only query for uncompleted tickets
    var ticketQuery = Ticket.find({completed: false}).sort({_id: 'desc'}).limit(5)
    ticketQuery.exec((err,tickets) => {
      if (err) {
        var errText = 'Sorry, something went wrong with mongoose'
        console.log(err)
      }
      // check if there are uncompleted tickets and generate output text
      if (tickets.length != 0) {
        var text = '### Here are the 5 most current tickets:\n\n```\n'
        tickets.forEach( ticket => {
          text +=
            'Ticket ID: ' + ticket._id + '\n' +
            'Color: ' + ticket.color + '\n' +
            'Email: ' + ticket.email + '\n' +
            'Created: ' + ticket.create_date + '\n' +
            '---------------------------------------------\n'
        });
        text += '\n\n```'
      }
      var noText = 'Looks like there are no tickets in the queue'
      // emmit with the bot
      bot.reply(message, errText || text || noText);

    });

  });

}
