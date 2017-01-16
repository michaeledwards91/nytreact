// Include React
// var React = require("react");
import React from "react";

// Here we include all of the sub-components

var Main = React.createClass({

	render: () => {
		return (
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h1>New York Times Article Scrubber</h1>
						<p>Search for and annotate articles of interest</p>
					</div>
				</div>
			</div>
		)
	}



});

module.exports = Main;