
var Ticket = require("../../models/ticket").Ticket;

function getTickets (n) {
  return new Promise((resolve, reject) => {
    var ticketQuery = Ticket.find({completed: false}).sort({_id: 'desc'}).limit(n);
    ticketQuery.exec((err,tickets) => {
      if (err) {
        reject(new Err(err))
      }
      resolve(tickets)
    });
  });
}

function createTicket (ticket) {
  return new Promise((resolve, reject) => {
    var newTicket = new Ticket(ticket)
    newTicket.save((err, ticket) => {
      if (err) {
        reject(new Err(err))
      }
      resolve(ticket)
    });
  });
}

module.exports = {
  getTickets: getTickets,
  createTicket: createTicket
}