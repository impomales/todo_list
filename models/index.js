var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://imp888:izzi1231@ds245277.mlab.com:45277/todos', { useMongoClient: true });
mongoose.Promise = Promise;

module.exports.Todo = require('./todo.js');