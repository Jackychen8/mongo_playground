var mongoose = require('mongoose');

var User = mongoose.model('User', {
	email: {
		trim: true,
		type: String,
		minLength: 5,
		required: true
	}
});

module.exports = {User};