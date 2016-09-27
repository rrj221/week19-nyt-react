//require stuff here from another file if i need to
//like maybe any models
var Article = require('../../models/article.js');
var Note = require ('../../models/note.js');

module.exports = function (app) {
	app.get('/', function (req, res) {
		console.log('okay now were getting somewhere');
		res.sendFile('./public/index.html')   //need to find path to index html
	});

	app.get('/saved', function (req, res) {
		Article.find({}).populate('notes').limit(5).sort([['_id', 'descending']]).exec(function(err, docs) {
			res.send(docs);
		})
	});

	app.post('/save/article', function (req, res) {
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

	app.post('/articles/:id', function (req, res) {
		console.log(req.body.noteToSave);
		console.log(req.body);

		var noteObj = {
			body: req.body.noteToSave
		}
		var articleId = req.params.id;

		var newNote = new Note(noteObj);

		newNote.save(function(err, newNote) {
			if (err) {
				res.send(err)
			} else {
				Article.findOneAndUpdate(
					{_id: articleId}, 
					{$push: {'notes': newNote._id}}, 
					{new: true}, 
					function (err, article) {
						if (err) {
							res.send(err)
						} else {
							console.log('newNote');
							console.log(newNote);
							res.send(newNote)
						}
				});
			}
		});
	});


	app.delete('/articles/delete/:id', function (req, res) {
		console.log(req.params.id);
		Article.findOneAndRemove({
			_id: req.params.id
		}).then(function (deleted) {
			res.json(deleted);
		});

	});

} 