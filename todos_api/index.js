var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    
app.get('/', function(req, res) {
    res.send('home');
});
    
app.listen(port, function() {
    console.log('app is running on port: ' + port);
});