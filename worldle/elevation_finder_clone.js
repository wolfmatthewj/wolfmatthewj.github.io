function ftn_processgetElevation(clickedLocation) {
	var locations=[];
	locations.push(clickedLocation);
	console.log(clickedLocation);
	var reqLat=clickedLocation.lat.toFixed(5);
	var reqLng=clickedLocation.lng.toFixed(5);
	var myReport="You asked for latitude "+reqLat+" and longitute "+reqLng;
	console.log(myReport);
	elevationMain()
}

function elevationMain() {
	// {var locations=[];
	locations.push(clickedLocation);
	console.log(clickedLocation);
	var reqLat=clickedLocation.lat.toFixed(5);
	var reqLng=clickedLocation.lng.toFixed(5);
	var api_url = 'https://api.open-elevation.com/api/v1/lookup?locations=' + reqLat + ',' + reqLng
	console.log(api_url);

	$.ajax({url:api_url,success:function(result){if(result)
	// {console.log(result);
		var elev=result.elevations[0].elevation;
		var g = document.getElementById('guess')
		g.innerHTML=elev
	// outputDiv.innerHTML+="<br/ > Location :"+clickedLocation.lat.toFixed(numberofdecimalplaceslatlng)+","+clickedLocation.lng.toFixed(numberofdecimalplaceslatlng);
	}},error:function(data,textStatus,jqXHR){console.log(textStatus);
		g.innerHTML="No results";
	});
