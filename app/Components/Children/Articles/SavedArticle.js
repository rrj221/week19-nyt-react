var React = require('react');
var moment = require('moment');

var SavedArticle = React.createClass({
	// saveClick: function () {
	// 	this.props.saveArticle(this.props.title, this.props.date, this.props.url);
	// },

	// getInitialState: function () {
	// 	return {
	// 		articleToDeleteId: '' 
	// 	}
	// },
	handleDeleteClick: function () {
		this.props.deleteArticle(this.props.id);
	},
	render: function () {
		var date = this.props.date
		if(date) {
			var dateNeat = moment(date).format("MM-DD-YYYY");
		} 
		
		console.log(dateNeat);
		return (
			<li className='result list-group-item'>
				<span><a href={this.props.url}>{this.props.title}</a> {dateNeat}</span>
				<button type='button' className='pull-right' onClick={this.handleDeleteClick} >Delete</button>
			</li>
		)
	}
});

module.exports = SavedArticle