var React = require('react');
var moment = require('moment');

var SavedArticle = React.createClass({
	// saveClick: function () {
	// 	this.props.saveArticle(this.props.title, this.props.date, this.props.url);
	// },

	getInitialState: function () {
		return {
			noteText: '' 
		}
	},
	handleDeleteClick: function () {
		this.props.deleteArticle(this.props.id);
	},
	handleChange: function (event) {
		console.log('type');
		this.setState({
			noteText: event.target.value
		});
	},
	newNoteSubmit: function (event) {
		event.preventDefault();
		console.log('new note');
		this.props.addNote(this.state.noteText, this.props.id)
	},
	render: function () {
		var date = this.props.date
		if(date) {
			var dateNeat = moment(date).format("MM-DD-YYYY");
		} 
		
		console.log(dateNeat);
		return (
			<div>
				<li className='result list-group-item'>
					<span><a href={this.props.url}>{this.props.title}</a> {dateNeat}</span>
					<button type='button' className='pull-right' onClick={this.handleDeleteClick} >Delete</button>
				</li>

				<li className='newNote list-group-item'>
					<form onSubmit={this.newNoteSubmit}>
						<div className="row">
						   <div className="col-lg-12">
						    <div className="input-group input-group">
					          <input 
					          	type="text" 
					          	className="form-control" 
					          	id="search-church" 
					          	placeholder="Write a new note"
					          	onChange={this.handleChange}
					          />
					          <span className="input-group-btn">
					            <button className="btn btn-default" type="submit">Add Note</button>
					          </span>
						    </div>
						  </div>
						</div>
					</form>
				</li>

			</div>
		)
	}
});

module.exports = SavedArticle