//require stuff here from another file if i need to
//like maybe any models
var Article = require('../../models/article.js');

module.exports = function (app) {
	app.get('/', function (req, res) {
		console.log('okay now were getting somewhere');
		res.sendFile('./public/index.html')   //need to find path to index html
	});

	app.post('/save', function (req, res) {
		console.log(req.body);

		Article.create({
			title: req.body.articleToSave.title,
			url: req.body.articleToSave.url,
			date: req.body.articleToSave.date
		}, function (err) {
			if (err) {
				console.log(err)
			} else {
				res.send('saved search in mongo');
			}
		});
	});

	app.get('/saved', function (req, res) {
		Article.find({}).limit(5).sort([['_id', 'descending']]).exec(function(err, docs) {
			res.send(docs);
		})
	})




} 