const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todos');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
	const id = req.params.id;
	
	if (!ObjectID.isValid(id)) {
		return res.send(404, {});
	}

	Todo.findById(id).then((todo)=> {
		if (!todo) {
			return res.send(404, {});
		}
		res.send({todo});
	}, (e) => {
		return res.send(400, {});
	});
});

app.delete('/todos/:id', (req, res) => {
	// get the id
	var id = req.params.id;

	// validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	// remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		// success
		// if no doc, send 404
		if (!todo) {
			return res.status(404).send();
		}
		// if doc, send doc back with 200
		res.send({todo});
	}).catch((e) => {
		// error
		// 400 with empty body
		res.status(400).send();
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	// take a subset of the things passed to us
	var body = _.pick(req.body, ['text', 'completed']);
	// validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// POST /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);// only take email and pass
	var user = new User(body);//validators in here in mongoose.js

	// model method (User) vs instance method (user)
	// User.findByToken // custom model method, takes JWT token, find user, return user
	
	// instance method, adding token to user document and sending back to user
	// user.generateAuthToken

	user.save().then(()=>{
		return user.generateAuthToken();
		// res.send(user);
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

// Moved to middleware/autheticate.js
// // creating middleware function
// var authenticate = (req, res, next) => {
// 	var token = req.header('x-auth');

// 	User.findByToken(token).then((user) => {
// 		if (!user) {
// 			return Promise.reject();
// 		}
// 		req.user = user;
// 		req.token = token;
// 		next();
// 	}).catch((e) => {
// 		res.status(401).send();
// 	});
// };

app.get('/users/me', authenticate, (req, res) => {
		res.send(req.user);
})

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};
// which promise libary are we going to use? originated from 3rd party libraries like bluebird
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose values/types
// mongoose validators
// mongoose schemas


// Typecasting is allowed so things like #s and Bools can become strings