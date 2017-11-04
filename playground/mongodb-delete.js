// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name:'andrew', age: 25}
// var {name} = user;// object destructuring
// console.log(name);

// You don't need to create a database ('TodoApp') before using it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// db.collection('Users').deleteMany({name: 'Jacky'}).then((result) => {
	// 	console.log(result);
	// });


	// deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').deleteOne({_id: new ObjectID("59fe00ee3c01305eba042946")}).then((result) => {
		console.log(result);
	});

	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	db.close();
});
