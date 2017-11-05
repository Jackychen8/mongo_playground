const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

//var id = '59fe487e415047cb62f3181e';
var id = '59fe2ddb923a5bdc601004ea';

User.findById(id).then((user)=> {
	if (!user) {
		return console.log('ID is not found');
	}
	console.log('User ID: ', user);
}, (e) => {
	console.log(e);
});

// if (!ObjectID.isValid()) {
// 	console.log('ID is not valid');	
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo by ID', todo);	
// })

