var React = require('react');
var Note = require('./Note.js');

var Notes = React.createClass({

	render: function () {
		var notes = this.props.notes;
		// var saveArticle = this.props.saveArticle;
		console.log('articles');
		console.log(notes);

		return (
			//<!-- This row will handle all of the retrieved articles -->*/}
			<div className="row">

				<div className="col-sm-12">



						{/*<!-- Panel Heading for the retrieved articles box -->*/}
						<div className="panel-heading">
							<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Notes</strong></h3>
						</div>

						{/*<!-- This main panel will hold each of the resulting articles -->*/}
						<ul className='list-group-item'>
							{

								notes.map((note) =>
									<Note
										body={note.body}
										// date={article.date}
										// url={article.url}
										// saveArticle={saveArticle}
									/>
								)

							}
						</ul>
				</div>
			</div>
		)
	}
})

module.exports = Notes;