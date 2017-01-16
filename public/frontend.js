$(document).ready(function() {

	//On document load, populate saved section with articles from /api/saved
	$.getJSON("/api/saved", function(data) {
		console.log(data);

		for (var i = 0; i < data.length; i++) {

			let newLi = $("<li></li>");
			newLi.addClass("list-group-item");
			let lihtml = "<p><a href="+data[i].url+">"+data[i].title+"</a></p>";
			lihtml += "<p>Date published: "+data[i].date+"</p>";
			lihtml += "<button class='btn btn-default unsaveBtn' data-id="+data[i]._id+">Unsave</button>";
			newLi.html(lihtml);
			newLi.appendTo("#savedList");

		}
	});

	$(document).on("click", "#savedRouteBtn", function() {
		$.getJSON("/api/saved", function(data) {
			console.log(data);

			for (var i = 0; i < data.length; i++) {

				let newLi = $("<li></li>");
				newLi.addClass("list-group-item");
				let lihtml = "<p>"+data[i].title+"</p>";
				lihtml += "<p>Date published: "+data[i].date+"</p>";
				lihtml += "<button class='btn btn-default unsaveBtn' data-id="+data[i]._id+">Unsave</button>";
				newLi.html(lihtml);
				newLi.appendTo("#savedList");

			}
		});
	});

	$(document).on("click", "#searchSubmitBtn", function() {
		let topic = $("#topicInput").val().trim();
		let startYear = $("#startYearInput").val().trim();
		startYear += "0101";
		let endYear = $("#endYearInput").val().trim();
		endYear += "1231";

		console.log("topic: " + topic);
		console.log("start year: " + startYear);
		console.log("end year: " + endYear);

		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param({
		  'api-key': "816a600ac4b04cab85d8b09b4c2de65e",
		  'q': topic,
		  'begin_date': startYear,
		  'end_date': endYear
		});

		$.ajax({
		  url: url,
		  method: 'GET',
		}).done(function(result) {
		  console.log(result);

		  //loop over first 5 results
		  for (var i = 0; i < 5; i++) {

		  	let newLi = $("<li></li>");
		  	newLi.addClass("list-group-item");
		  	let lihtml = "<a href='"+result.response.docs[i].web_url+"'>"+result.response.docs[i].headline.main+"</a>";
		  	lihtml += "<button class='btn btn-default saveArticleBtn' data-title='"+result.response.docs[i].headline.main+"' data-date="+result.response.docs[i].pub_date+" data-url="+result.response.docs[i].web_url+"> Save</button>";
		  	console.log(lihtml);
		  	newLi.html(lihtml);

		  	newLi.appendTo("#resultsList");

		  }

		}).fail(function(err) {
		  throw err;
		});

	}); //end of search submit button

	$(document).on("click", ".saveArticleBtn", function() {

		console.log("clicked save article button");
		$.post("/api/saved", {
			title: $(this).attr("data-title"),
			date: $(this).attr("data-date"),
			url: $(this).attr("data-url")
		})
		.done(function(data) {
			console.log("posted data? : " + data);
		});

	});

	$(document).on("click", ".unsaveBtn", function() {

		let articleid = $(this).attr("data-id");

		$.ajax({
			url: "/api/saved",
			method: "DELETE",
			data: {_id: articleid}
		})
		.done(function(data) {
			console.log(data);
		});

	});




});