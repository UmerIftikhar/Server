// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var requestTrackingSchema = new mongoose.Schema({
localrecord			:{
		  email: { type: String }
		, sampledata1: String
		, sampledata2: String
		, commands: String
}

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Record', requestTrackingSchema);