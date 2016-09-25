var React = require('react');
var Result = require('./Articles/Result');

var Results = React.createClass({
	render: function () {
		var articles = this.props.articles;
		var saveArticle = this.props.saveArticle;
		console.log('articles');
		console.log(articles);

		return (
			//<!-- This row will handle all of the retrieved articles -->*/}
			<div className="row">

				<div className="col-sm-12">



						{/*<!-- Panel Heading for the retrieved articles box -->*/}
						<div className="panel-heading">
							<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Results</strong></h3>
						</div>

						{/*<!-- This main panel will hold each of the resulting articles -->*/}
						<ul className='list-group-item'>
							{
								articles.map((article) =>
									<Result
										title={article.title}
										date={article.date}
										url={article.url}
										saveArticle={saveArticle}
									/>
								)
							}
						</ul>
				</div>
			</div>
		)
	}
})

module.exports = Results;