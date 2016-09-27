var React = require('react');
var SavedArticle = require('./Articles/SavedArticle');

var SavedArticles = React.createClass({
	render: function () {
		var savedArticles = this.props.savedArticles;
		return (
			//<!-- This row will handle all of the retrieved articles -->*/}
			<div className="row">

				<div className="col-sm-12">
				<br/>

					{/*<!-- This panel will initially be made up of a panel and wells 
					for each of the articles retrieved -->*/}
					<div className="panel panel-primary">

						{/*<!-- Panel Heading for the retrieved articles box -->*/}
						<div className="panel-heading">
							<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved</strong></h3>
						</div>

						{/*<!-- This main panel will hold each of the resulting articles -->*/}
						<ul className='list-group-item'>
							{
								savedArticles.map((article) =>
									<SavedArticle
										id={article._id}
										title={article.title}
										date={article.date}
										url={article.url}
										notes={article.notes}
										deleteArticle={this.props.deleteArticle}
										addNote={this.props.addNote}
										// saveArticle={saveArticle}
									/>
								)
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = SavedArticles;