var React = require('react');

var jumboStyle = {
	backgroundColor: '#20315A',
	color: 'white'
}

///////include subcomponents here (require)
var Search = require('./Children/Search.js');
var Results = require('./Children/Results.js');
var SavedArticles = require('./Children/SavedArticles.js');


//helper function (nyt api stuffs)
var helpers = require('./utils/helpers.js');

// var searchSchema = require('../../../models/searchSchema.js');

//main component
var Main = React.createClass({

	getInitialState: function () {
		return {
			searchObj: {
				topic: '',
				startYear: 0,
				endYear: 0
			},
			results: [],
			savedArticles: [],
			savedCount: 0,
			articleToDeleteId: ''
		}
	},

	setSearch: function (searchObj) {
		console.log('now I am searching from the main.');
		console.log('i a searching for', searchObj);
		this.setState({
			searchObj: searchObj
		})
	},

	saveArticle: function (title, date, url) {
		console.log('article has been saved not');
		console.log(title, date, url);
		var articleToSave = {
			title: title,
			date: date, 
			url: url
		}

		var savedArticlesTemp = this.state.savedArticles;

		this.setState({
			savedArticles: this.state.savedArticles.concat(articleToSave),
			savedCount: this.state.savedCount + 1
		});
	},

	deleteArticle: function(articleId) {
		this.setState({
			articleToDeleteId: articleId,
		});
	},

	addNote: function(note, articleId) {
		console.log('i am in main now');
		console.log(note);
		helpers.saveNoteToMongo(note, articleId).then(function(results) {
			console.log('i got this from mongo');
			console.log(results);
			var newNotez = results.data;
			var newNote = {
				_id: results.data._id,
				body: results.data.body,
			}
			console.log(newNote);
			var savedArticles = this.state.savedArticles;
			console.log(savedArticles);
			savedArticles.forEach(function(article, i) {
				if (article._id === articleId) {
					article.notes.push(newNote);
				}
			});
			console.log(savedArticles);

			this.setState({
				savedArticles: savedArticles
			});
		}.bind(this));
	},

	componentDidUpdate: function(prevProps, prevStates) {

		//search new york times
		if (prevStates.searchObj !== this.state.searchObj) {
			console.log('updated');

			helpers.searchNYT(this.state.searchObj)
				.then(function (articles) {
					if (this.state.results !== articles) {
						this.setState({
							results: articles
						});
					}
				}.bind(this));
		}

		//save article to db
		if (prevStates.savedArticles !== this.state.savedArticles && 
			this.state.savedCount !== prevStates.savedCount) {

				var articleToSave = this.state.savedArticles[this.state.savedArticles.length - 1];

				console.log('articleToSave ------------');
				console.log(articleToSave);


				//i have to make sure it hasn't been saved first
				helpers.saveToMongo(articleToSave).then(function(data) {
					console.log('saved not');
					console.log(data);
				}.bind(this));
		}

		//show new note
		if (prevStates.savedArticles !== this.state.savedArticles) {
			// helpers.getSavedArticles()
			// 	.then(function(results) {
			// 		var savedArticlesArr = results.data;
			// 		this.setState({
			// 			savedArticles: savedArticlesArr
			// 		})
			// 	}.bind(this));
		}

		//delete article
		if (prevStates.articleToDeleteId !== this.state.articleToDeleteId) {
			helpers.deleteArticleRoute(this.state.articleToDeleteId)
				.then(function(results) {
					console.log('results', results);

					//display saved articles after delete
					console.log('i would like to reload the articles now')
					helpers.getSavedArticles()
						.then(function(results) {
							var savedArticlesArr = results.data;
							console.log(savedArticlesArr);
							this.setState({
								savedArticles: savedArticlesArr
							})
						}.bind(this));
				}.bind(this));
		}
	},

	//show saved articles
	componentDidMount: function () {
		helpers.getSavedArticles()
			.then(function(results) {
				var savedArticlesArr = results.data;
				this.setState({
					savedArticles: savedArticlesArr
				})
			}.bind(this));
	},

	render: function () {
		return (

			<div>
				<img src='./images/react.png' alt='react' width='144.5px' height='67.5px'/>

				<div className="container">

					{/*<!-- Jumbotron-->*/}
					<div className="jumbotron" style={jumboStyle}>
						<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
					</div>

					{/*<!-- Search -->*/}
					<div className='search'>
						<Search setSearch={this.setSearch} />
					</div>

					{/*<!-- Results -->*/}
					<div className='results'>
						<Results articles={this.state.results} saveArticle={this.saveArticle}/>
					</div>

					{/*<!-- Saved -->*/}
					<div className='saved'>
						<SavedArticles 
							savedArticles={this.state.savedArticles} 
							deleteArticle={this.deleteArticle}
							addNote={this.addNote}
						/>
					</div>

				</div>
			</div>


		)
	}
})


module.exports = Main;