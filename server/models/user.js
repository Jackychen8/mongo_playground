const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// methods create instance methods
UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const access = 'auth';
	const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({ access, token });

	return user.save().then(() => {
		return token;
	});
};

// statics create model method
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		// return new Promise((resolve, reject) => {
		// 	reject();
		// })
		return Promise.reject('test');// this will be passed to catch() in server.js
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,// to query nested argument, use quotes
		'tokens.access': 'auth'
	});
}

// mongoose middleware
UserSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) {
		//user.password
		bcrypt.genSalt(10, (err, salt) => {//10 rounds
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		console.log("password hasn't been modified");		
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};