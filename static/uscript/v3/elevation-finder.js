var map;var routeMarkers=new Array(0);var autocomplete;var numberofdecimalplaces=1;var numberofdecimalplaceslatlng=5;function GUnload(){}
function Gload()
{document.getElementById(mapDivID).style.cursor="crosshair";var openstreetmap=L.tileLayer('https://{s}.'+tileProviderURL+'/{z}/{x}/{y}.png',{maxZoom:18,attribution:tileProviderAttribution});var ESRIImg=L.esri.basemapLayer('Imagery');var ESRIImbLab=L.esri.basemapLayer('ImageryLabels');map=L.map(mapDivID,{fullscreenControl:true,fullscreenControlOptions:{position:'topleft'}}).setView(latlng,zoom);var baseLayers={"OSM":openstreetmap,"Satellite":ESRIImg};var overlays={"Labels":ESRIImbLab,};openstreetmap.addTo(map);L.control.layers(baseLayers,overlays).addTo(map);L.control.locate().addTo(map);map.on('click',getElevation);}
function getElevation(event)
{console.log("getElevation");ftn_processgetElevation(event.latlng);outputDiv.innerHTML="Please Wait...";}
function ftn_processgetElevation(clickedLocation)
{var locations=[];locations.push(clickedLocation);console.log(clickedLocation);var reqLat=clickedLocation.lat.toFixed(5);var reqLng=clickedLocation.lng.toFixed(5);var myReport="You asked for latitude "+reqLat+" and longitute "+reqLng;console.log(myReport);window.alert(myReport);}
// {var locations=[];locations.push(clickedLocation);console.log(clickedLocation);var reqLat=clickedLocation.lat.toFixed(5);var reqLng=clickedLocation.lng.toFixed(5);var StrURL="ajax/elevation-service.php?v=3&lat="+reqLat+"&lng="+reqLng;console.log(StrURL);$.ajax({url:StrURL,success:function(result){if(result)
// {console.log(result);var elev=result.elevations[0].elevation;outputDiv.innerHTML=elev.toFixed(numberofdecimalplaces)+" m or "+(elev*3.2808399).toFixed(numberofdecimalplaces)+" feet";outputDiv.innerHTML+="<br/ > Location :"+clickedLocation.lat.toFixed(numberofdecimalplaceslatlng)+","+clickedLocation.lng.toFixed(numberofdecimalplaceslatlng);var marker=ftn_LG_PlaceMarker(0,clickedLocation,elev.toFixed(numberofdecimalplaces)+" m / "+(elev*3.2808399).toFixed(numberofdecimalplaces)+" feet",true);marker.on('click',function(e){console.log(e.latlng);marker.remove();});routeMarkers.push(marker);}
// else
// {outputDiv.innerHTML="No results found";}},error:function(data,textStatus,jqXHR){console.log(textStatus);outputDiv.innerHTML="No results";}});}
function ftnResetMap()
{if(routeMarkers)
{for(i in routeMarkers)
{routeMarkers[i].remove();}}
routeMarkers=new Array(0);outputDiv.innerHTML="";}
function ftnSearchUtilReturn(lat,lng)
{if((lat)&&(lng))
{var latlng={"lat":Number(lat),"lng":Number(lng)};map.setView(latlng,11);$("#locationSearchButton").prop('value','Estimate Elevation');$("#locationSearchButton").html("Estimate Elevation");ftn_processgetElevation(latlng);outputDiv.innerHTML="Please Wait...";}
else
{$("#locationSearchButton").prop('value','Not Found');$("#locationSearchButton").html("Not Found");outputDiv.innerHTML="";}}