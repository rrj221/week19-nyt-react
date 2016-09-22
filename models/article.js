var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: String,
	date: String,
	url: String,
	dateSaved: {
		type: Date,
		default: Date.now
	},
	notes: [{
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}]
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;


