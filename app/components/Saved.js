import React from "react";

var Saved = React.createClass({

	render: function() {
		return (
		<div className="row">

			<div className="panel panel-default">

				<div className="panel-heading">
					<h3 className="panel-title">Saved</h3>
				</div>

				<div className="panel-body">
					<ul className="list-group" id="savedList">

					</ul>
				</div>

				
			</div>

		</div>
		);
	}



});

module.exports = Saved;