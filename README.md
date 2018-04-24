## Express Botkit Mongoose Application Boilerplate
Simple boilerplate for building express/botkit/mongoose applications.
Express server and routes are separated and organized to allow quick API development while integrating botkit's logic.

### File structure
```
|__ controllers
|  |
|  |__ spark
|  |  |__ about.js
|  |  |__ help.js
|  |  |__ queue.js
|  |  |__ support.js
|  |
|  |__ web
|  |  |__ api.js
|  |
|  |__ twilio
|
|__ helpers
|  |__ spark.js
|
|__ models
|  |__ticket.js
|
|__ app.js
|__ routes.js
|__ server.js
```

### Considerations
- Make sure you edit the `.env` file with your variables, including the ngrok URL for the spark webhook.
- You can use a local mongo database or cloud hosted like [mlab](https://mlab.com) or [mongodb](https://mongodb.com)

### Try it out !
```
git clone  https://github.com/vraulsan/boilerplate-express-botkit-mongoose
cd boilerplate-express-botkit-mongoose && npm install
```
Edit `.env` with your variables
```
node app.js
```

### Demo

![demo](https://i.imgur.com/KJ0Z1gi.gif)

