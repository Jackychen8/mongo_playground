var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todos');

var app = express();

// middleware
app.use(bodyParser.json());

//http://httpstatuses.com/
app.post('/todos', (req, res) => {
	console.log(req.body);
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos)=> {
		res.send({
			todos
		});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};
// which promise libary are we going to use? originated from 3rd party libraries like bluebird
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose values/types
// mongoose validators
// mongoose schemas


// Typecasting is allowed so things like #s and Bools can become strings