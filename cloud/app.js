
// These two lines are required to initialize Express in Cloud Code.
express = require('express');
app = express();
var parseExpressHttpsRedirect = require('parse-express-https-redirect'); 
var user = require('cloud/route/user');
// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
// Automatically redirect non-secure urls to secure ones
app.use(parseExpressHttpsRedirect());    
// Middleware for reading request body  
app.use(express.methodOverride());
// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });
app.get('/user', user.getUser);
app.get('/event/:id', user.getEventById);
app.get('/owner/events', user.getEventsByUser);
app.post('/event', user.addEvent);
app.post('/search/event', user.addEvent);



// Attach the Express app to Cloud Code.
app.listen();