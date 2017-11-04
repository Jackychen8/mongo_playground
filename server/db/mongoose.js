var mongoose = require('mongoose');

// which promise libary are we going to use? originated from 3rd party libraries like bluebird
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// mongoose values/types
// mongoose validators
// mongoose schemas

// var Todo = mongoose.model('Todo', {
// 	text: {
// 		type: String,
// 		required: true,
// 		minLength: 1,
// 		trim: true// get rid of white space
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	},
// 	completedAt: {
// 		type: Number,
// 		default: null
// 	}
// });

// Typecasting is allowed so things like #s and Bools can become strings

// var User = mongoose.model('User', {
// 	email: {
// 		trim: true,
// 		type: String,
// 		minLength: 5,
// 		required: true
// 	}
// })

// var user = new User({
// 	email: '123456'
// });

// user.save().then((doc) => {
// 	console.log('User saved', doc);
// }, (err) => {
// 	console.log('Errored');
// })

module.exports = {mongoose};