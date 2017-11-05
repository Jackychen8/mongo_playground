const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//jwt.sign // takes the object and signs it, creates the hash
//jwt.verify // takes token and secret and makes sure it hasn't been manipulated
var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
// {
//   "alg": "HS256",
//   "typ": "JWT"
// }
// {
//   "id": 10,
//   "iat": 1509858957// issued at time
// }

// var message = 'I am user #3';
// var hash = SHA256(message.toString());

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'someRandomNewSecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'someRandomNewSecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }

