// Include React
// var React = require("react");
import React from "react";

// Here we include all of the sub-components

var Search = React.createClass({

	render: function() {
		return (
			<div className="row">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Search</h3>
					</div>

					<div className="panel-body">

						<div className="input-group">
						  	<input type="text" className="form-control" placeholder="Topic" aria-describedby="basic-addon1" id="topicInput"></input>
						</div>

						<div className="input-group">
						  	<input type="text" className="form-control" placeholder="Start Year" aria-describedby="basic-addon1" id="startYearInput"></input>
						</div>

						<div className="input-group">
						  	<input type="text" className="form-control" placeholder="End Year" aria-describedby="basic-addon1" id="endYearInput"></input>
						</div>
				    	
					</div>
				</div>

				<div className="panel panel-default">

					<div className="panel-heading">
						<h3 className="panel-title">Results</h3>
					</div>

					<div className="panel-body" id="resultsPanel">

					</div>

					
				</div>


			</div>
		);
	}



});

module.exports = Search;