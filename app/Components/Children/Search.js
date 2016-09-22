var React = require('react');

var Search = React.createClass({
	getInitialState: function () {
		return {
			topic: '',
			startYear: 0,
			endYear: 0
		};
	},

	handleChange: function(event) {
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	searchClick: function () {
		console.log('click!');
		console.log(this.state)

		this.props.setSearch(this.state);
	},

	clearSearch: function () {
		//need to figure out how to make these changes to the page
		//not sure if there's a special react way to do it
		var clearedSearch = {
			topic: '',
			startYear: 0,
			endYear: 0
		}
		this.setState(clearedSearch)
	},

	render: function () {
		return (
			<div className="row">
				<div className="col-sm-12">
				<br/>
					{/*<!-- First panel is for handling the search parameters -->*/}
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
						</div>
						<div className="panel-body">

							{/*<!-- Here we create an HTML Form for handling the inputs-->*/}
							<form role="form">

						  	  {/*<{/*!-- Here we create the text box for capturing the search term-->*/}
							  <div className="form-group">
							    <label htmlFor="topic">Search Term:</label>
							    <input type="text" className="form-control" onChange={this.handleChange} id="topic"/>
							  </div>


						  	  {/*<!-- Here we capture the Start Year Parameter-->*/}
							  <div className="form-group">
							    <label htmlFor="startYear">Start Year (Optional):</label>
							    <input type="number" className="form-control" onChange={this.handleChange} id="startYear"/>
							  </div>

						  	  {/*<!-- Here we capture the End Year Parameter -->*/}
							  <div className="form-group">
							    <label htmlFor="endYear">End Year (Optional):</label>
							    <input type="number" className="form-control" onChange={this.handleChange} id="endYear"/>
							  </div>

							  {/*<!-- search and clear buttons -->*/}
							  <button type="button" className="btn btn-default" id="runSearch" onClick={this.searchClick}><i className="fa fa-search"></i> Search</button>
		  					  <button type="button" className="btn btn-default" id="clearAll" onClick={this.clearSearch}><i className="fa fa-trash"></i> Clear Results</button>

							</form>
						</div>
					</div>
				</div>
			</div>
			
		)
	}
});


module.exports = Search;