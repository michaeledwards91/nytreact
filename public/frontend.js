$(document).ready(function() {

	$(document).on("click", "#searchSubmitBtn", function() {
		let topic = $("#topicInput").val().trim();
		let startYear = $("#startYearInput").val().trim();
		let endYear = $("#endYearInput").val().trim();

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
		  	let lihtml = result.response.docs[i].headline.main;
		  	lihtml += "<button class='btn btn-default saveArticleBtn' data-title='"+lihtml+"' data-date="+result.response.docs[i].pub_date+" data-url="+result.response.docs[i].web_url+"> Save</button>";
		  	console.log(lihtml);
		  	newLi.html(lihtml);

		  	newLi.appendTo("#resultsList");

		  }

		}).fail(function(err) {
		  throw err;
		});

	}); //end of search submit button

	






});