var React = require('react');

var Note = React.createClass({
	render: function () {
		return (
			<li className='result list-group-item'>
				<span>{this.props.body}</span>
				<button type='button' className='pull-right'>Delete</button>
				<button type='button' className='pull-right'>Edit</button>
			</li>
		)
	}
});

module.exports = Note