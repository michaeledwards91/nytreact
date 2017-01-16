// Include React
// var React = require("react");
import React from "react";

// Here we include all of the sub-components

var Main = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="jumbotron">
						<h1>New York Times Article Scrubber</h1>
						<p>Search for and annotate articles of interest</p>
						<a href="#/search"><button className="btn btn-default">Search</button></a>
            			<a href="#/saved"><button className="btn btn-default" id="savedRouteBtn">Saved</button></a>
					</div>
				</div>

				{this.props.children}

			</div>
		);
	}



});

module.exports = Main;