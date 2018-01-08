var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    
var todoRoutes = require('./routes/todos.js');

app.get('/', function(req, res) {
    res.send('home');
});

app.use('/api/todos', todoRoutes);
    
app.listen(port, function() {
    console.log('app is running on port: ' + port);
});