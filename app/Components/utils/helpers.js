var axios = require('axios');

//NYT stuffs
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

var helpers = {
	createQueryURL: function (searchObj) {
		var queryURL = queryURLBase + searchObj.topic;

		//add start year if it's there
		if (parseInt(searchObj.startYear)) {
			queryURL = queryURL + "&begin_date=" + searchObj.startYear + "0101";
		}

		//add end year if it's there
		if (parseInt(searchObj.endYear)) {
			queryURL = queryURL + "&end_date=" + searchObj.endYear + "0101";
		}	

		return queryURL;	
	},
	formatResponse: function (resultsRaw) {
		var resultsArr = [];

		//only want first 5
		if (resultsRaw.length > 5) {
			resultsRaw = resultsRaw.slice(0, 5);
		}

		resultsRaw.forEach(function (result, i) {
			console.log(i);


			function Article(title, date, url) {
				this.title = title;
				this.date = date;
				this.url = url;
			};
			var title = result.headline.main;
			var date = result.pub_date;
			var url = result.web_url;

			var article = new Article(title, date, url);
			resultsArr.push(article);
		})

		return resultsArr;
	},
	searchNYT: function (searchObj) {
		console.log('helpers');
		console.log(searchObj);

		var queryURL = this.createQueryURL(searchObj);
		console.log(queryURL);

		return axios.get(queryURL).then(function (response) {
			console.log(response);

			var resultsRaw = response.data.response.docs;

			//this should be an array of objects
			var results = this.formatResponse(resultsRaw);


			return results;
		}.bind(this))
	},
	saveToMongo: function (articleToSave) {
		return axios({
			method: 'post',
			url: '/save/article',
			data: {
				articleToSave
			}
		}).then(function (results) {
			return results;
		})
	},
	saveNoteToMongo: function (noteToSave, articleId) {
		return axios({
			method: 'post',
			url: '/articles/'+articleId,
			data: {
				noteToSave: noteToSave,
			}
		}).then(function (results) {
			return results;
		})
	},
	getSavedArticles: function() {
		return axios({
			method: 'get',
			url: '/saved'
		}).then(function(results) {
			console.log('returning now')
			console.log('results');
			return results;
		})
	},
	deleteArticleRoute: function(id) {
		console.log(id);
		console.log('searching now');
		var url = '/article/delete/' + id
		console.log(url);
		return axios({
			url: url,
			method: 'delete',
		}).then(function (results) {
			console.log ('returning now');
			return results;
		})
	}
}

module.exports = helpers;