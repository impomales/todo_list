var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
    
var todoRoutes = require('./routes/todos.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/todo_list_frontend'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/todo_list_frontend/build/index.html');
});

app.use('/api/todos', todoRoutes);
    
app.listen(port, function() {
    console.log('app is running on port: ' + port);
});