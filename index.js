// noahball.com APIconst express = require('express')
const express = require('express');
var bodyParser = require('body-parser'); // Parser
const app = express();
const port = 3000;

// Arrays
var people = [];
var emails = [];
var messages = [];

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('You\'ve reached the noahball.com API.')
})

app.post('/v1/contact', (req, res) => {
    people.push(req.body.name);
    emails.push(req.body.email);
    messages.push(req.body.message);
    res.redirect('https://noahball.com' + '?result=success');
})

app.get('/v1/contact/view', (req, res) => {
    var response;
    for (var i = 0; i < people.length; i++) {
        if(i == 0) {var response = '<h3>Message from <strong>' + people[i] + '</strong> (<strong>' + emails[i] + '</strong>)</h3><p><strong>' + messages[i] + '</strong></p>'} else {var response = response + '<h3>Message from <strong>' + people[i] + '</strong> (<strong>' + emails[i] + '</strong>)</h3><p><strong>' + messages[i] + '</strong></p>'}
    }

    if(response == undefined) {var response = '<strong>No responses found.</strong><br>Responses are cleared each time the server restarts (which is after 15 minutes of inactivity)<br>Try sending a new contact form response!'}

    res.send('<style>body{font-family: Arial}</style><h1>noahball.com Contact Form Demo API</h1>' + response)
})

app.listen(port, () => {
    console.log(`noahball.com API running on port ${port}`)
})