//* This is the "Support Request" conversation
//* User will request assistance with one of our Managed Services Teams
//* The conversation will prompt the user for basic information before team engagement

module.exports = function (controller) {

  var Ticket = require("../../models/ticket").Ticket;

  controller.hears(["support", "^ticket"], 'direct_message,direct_mention', function (bot, message) {

    var aTicket = {};

    bot.createConversation(message, function(err, convo) {

      convo.addQuestion(firstQuestion, [

        {
          pattern: 'yes',
          callback: function(response, convo) {
            convo.setVar('email', response.data.personEmail)
            aTicket.email = response.data.personEmail
            convo.gotoThread('second-question-thread');

          }
        },
        {
          pattern: 'no',
          callback: function(response, convo) {
            convo.gotoThread('exit-thread');
          }
        },
        {
          default: true,
          callback: function(response, convo) {
            convo.say('I did not get that !');
            convo.gotoThread('default');

          }
        }

      ],{},'default');

      convo.addQuestion(secondQuestion, [

        {
          pattern: 'blue|red|yellow|pink|purple|black|white|brown|green|gray|orange',
          callback: function(response, convo) {
            console.log(response.match[0])
            convo.setVar('color', response.match[0]);
            aTicket.color = response.match[0]
            var ticket = new Ticket(aTicket)
            ticket.save((err, ticket) => {
              if (err) throw err;
              console.log('Saved ticket: ', ticket);
              convo.setVar("id", ticket._id);
              convo.gotoThread('all-done-thread');
            })
          }
        },
        {
          default: true,
          callback: function(response, convo) {
            convo.say('I did not get that !');
            convo.gotoThread('second-question-thread');

          }
        }

      ], {}, 'second-question-thread');

      convo.addMessage({
        text: 'Thank you, please see your ticket below:\
          \n\
          Ticket #{{vars.id}}\n\
          Color: {{vars.color}}\n\
          Email: {{vars.email}}\n'
      }, 'all-done-thread');

      convo.addMessage({
        text: 'Alright, see you next time.'
      }, 'exit-thread');

      convo.activate();

    });

  });
}

// define prompt questions
var firstQuestion = "Do you want me to generate a support ticket for you?\n\nSay **yes** or **no**"

var secondQuestion = "Excellent, now give me a color.\n\n" +
"You can say something like **blue** **red** **yellow**."


