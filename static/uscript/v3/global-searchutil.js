var FMTkey="17o8dysaCDrgv1c";var OsmNamesKey="C7i0kEFQS2ggqr5zC2nv";var autocomplete;$(document).ready(function(){$('#locationSearchTextBox').on('keypress',function(e){if(e.which===13){$(this).attr("disabled","disabled");ftnSearchLocation($("#locationSearchTextBox").val(),$("#locationSearchSelect").val());$(this).removeAttr("disabled");}});$('#locationSearchTextBox').on('keyup',function(e){if($("#locationSearchSelect").val()=="zip"){this.value=this.value.replace(/[^0-9\.]/g,'');}});if(typeof preventautocompleteonpageload==="undefined"){if(countryCode)
{ftnAutoComplete(countryCode);}
else
{ftnAutoComplete(false);}}});function ftnlocationSearchSelectChange(val)
{if(autocomplete)
{autocomplete.enable(false);}
$("#locationSearchTextBox").prop('value','');if(val=="ll")
{$("#locationSearchTextBox").attr("placeholder","Latitude, Longtitude");$("#locationSearchButton").show();}
if(val=="zip")
{$("#locationSearchTextBox").attr("placeholder","Example:10118");$("#locationSearchButton").show();}
if(val=="cad")
{$("#locationSearchTextBox").attr("placeholder","Example:V9Z 1E7");$("#locationSearchButton").show();}
if(val=="ukpc")
{$("#locationSearchTextBox").attr("placeholder","Example:SW3 6NT");$("#locationSearchButton").show();}
if(val=="text")
{$("#locationSearchTextBox").attr("placeholder","Find a Location");$("#locationSearchButton").show();}
if(val=="autotext")
{$("#locationSearchTextBox").attr("placeholder","Find a Location");$("#locationSearchButton").hide();ftnAutoComplete(countryCode);}
if(val=="gps")
{$("#locationSearchTextBox").attr("placeholder","Searching...");$("#locationSearchButton").hide();ftnGeoLocation();}}
function ftnSearchLocation(inp,type)
{if(type=="ll")
{inp=inp.replace(/ /g,"");if(inp.includes(","))
{inp=inp.split(",");ftnSearchUtilReturn(inp[0],inp[1]);}
else
{ftnSearchUtilReturn(null,null);}}
if(type=="ukpc")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocodePMT("uk/postcode-lat-lng","postcode",inp.replace(" ","%20"));}
if(type=="zip")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocodePMT("us/zip-lat-lng","zip",inp);}
if(type=="cad")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocodePMT("ca/postal-code-lat-lng","postcode",inp);}
if(type=="ind")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocodePMT("in/pincode-lat-lng","pincode",inp);}
if(type=="aus")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocodePMT("au/postcode-lat-lng","postcode",inp);}
if(type=="text")
{$("#locationSearchButton").prop('value','Searching');ftnAPIGeocode(inp,countryCode);}
return false;}
function ftnSearchUtilReturn(lat,lng)
{if((lat)&&(lng))
{var latlng=new google.maps.LatLng(lat,lng);map.setCenter(latlng);map.setZoom(17);$("#locationSearchButton").prop('value','Search');if(document.getElementById("rb_placedistancemarker1")){if(document.getElementById("rb_placedistancemarker1").checked==true)
{clickatpoint(latlng);}}}
else
{$("#locationSearchButton").prop('value','Not Found');}}
function ftnAPIGeocodePMT(service,verb,inp){$.ajax({url:'https://api.promaptools.com/service/'+service+'/get/?'+verb+'='+inp+'&key='+FMTkey,type:"GET",dataType:'JSON',success:function(result){if(result.status=="1")
{ftnSearchUtilReturn(result.output[0].latitude,result.output[0].longitude);}
else{ftnSearchUtilReturn(null,null);}},error:function(x,y,z){console.log(y);}});}
function ftnAPIGeocode(place,countryCode){console.log("ftnAPIGeocode:"+countryCode);var URLsearch="https://nominatim.openstreetmap.org/search?q="+place+"&format=jsonv2&countrycodes="+countryCode+"&addressdetails=1";if(countryCode==false){URLsearch="https://nominatim.openstreetmap.org/search?q="+place+"&format=jsonv2&addressdetails=1";}
$.ajax({url:URLsearch,success:function(result){if(result)
{if(result[0])
{ftnSearchUtilReturn(result[0].lat,result[0].lon);}
else
{console.log("Geocode was not successful. [0] is null");ftnSearchUtilReturn(null,null);}}
else
{console.log("Geocode was not successful");ftnSearchUtilReturn(null,null);}}});}
function ftnAutoComplete(countryCode){if(countryCode)
{autocomplete=new kt.OsmNamesAutocomplete('locationSearchTextBox','https://geocoder.tilehosting.com/'+countryCode+'/',OsmNamesKey);autocomplete.registerCallback(function(item){ftnSearchUtilReturn(item.lat,item.lon);});}
else{autocomplete=new kt.OsmNamesAutocomplete('locationSearchTextBox','https://geocoder.tilehosting.com/',OsmNamesKey);autocomplete.registerCallback(function(item){ftnSearchUtilReturn(item.lat,item.lon);});}}
function ftnGeoLocation(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(position){ftnSearchUtilReturn(position.coords.latitude,position.coords.longitude);$("#locationSearchTextBox").attr("placeholder","Location Found");},noLocation);}
else{$("#locationSearchTextBox").attr("placeholder","Location Not Available");}}
function noLocation()
{$("#locationSearchTextBox").attr("placeholder","Location Not Available");}