var xmlbuilderversion=2;var dialog_usermenu;var page;var saveloadtype="";var pagestosavearea=["how-far-can-i-travel.htm","find-zip-codes-inside-user-defined-area.htm","find-uk-postcodes-inside-user-defined-area.htm","find-australian-postcodes-inside-user-defined-area.htm","find-population.htm","area-calculator.htm","find-australian-postcodes-inside-user-defined-area","find-netherlands-postcodes-inside-user-defined-area.htm","find-german-postcodes-inside-user-defined-area.htm","find-new-zealand-postcodes-inside-user-defined-area.htm"];var pagestosaveradius=["radius-around-point.htm","find-zip-codes-inside-radius.htm","find-uk-postcodes-inside-radius.htm","find-australian-postcodes-inside-radius.htm"];var pagestosaveroute=["measure-distance.htm","how-far-is-it-between.htm","distance-between-uk-postcodes.htm"];var pagestosaveconcentriccircle=["concentric-circles.htm"];var pagestosaveroutemap=["plot-airport-routes.htm"];var newFMTmarkersizefactor;var newFMTmarkeropacity;$(document).ready(function()
{$(".account").click(function()
{var X=$(this).attr('id');if(X==1)
{$(".submenu").hide();$(this).attr('id','0');}
else
{$(".submenu").show();$(this).attr('id','1');}});$(".submenu").mouseup(function()
{return false});$(".account").mouseup(function()
{return false});$(document).mouseup(function()
{$(".submenu").hide();$(".account").attr('id','');});dialog_usermenu=$("#modal-dialog").dialog({autoOpen:false,height:300,width:350,modal:true,buttons:{"Load":loadfrommodal,Cancel:function(){dialog_usermenu.dialog("close");}},close:function(){}});if(localStorage.fmtuserdata)
{xmlDoc=xmlreader(localStorage.fmtuserdata);if(typeof xmlDoc.getElementsByTagName("fmtuserdata")[0]!=='undefined')
{if(xmlDoc.getElementsByTagName("fmtuserdata")[0].attributes["unitssetting"].value=="km")
{settings_unit_handler=KMS;}
else
{settings_unit_handler=MILES;}}
else
{console.log("poor formed localStorage");localStorage.fmtuserdata="";settings_unit_handler=KMS;}}
else
{}
ftn_loadcontext();});function ftn_loadcontext()
{var path=window.location.pathname;page=path.split("/").pop();if(page=="")
{$(".account").hide();}
if(localStorage.fmtuserdata)
{document.getElementById("li_user_exportdata").hidden=false;}
else
{document.getElementById("li_user_exportdata").hidden=true;}
if($.inArray(page,pagestosavearea)>-1)
{saveloadtype="Area";document.getElementById("li_user_save").hidden=false;if(page=="how-far-can-i-travel.htm")
{document.getElementById("li_user_load").hidden=true;}
else
{document.getElementById("li_user_load").hidden=false;}
document.getElementById("li_user_load").innerHTML='<a href="#" onclick="ftn_user_load();" title="Loads an area from memory">Load Area ('+ftn_countsaved()+')</a>';document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves an area to memory">Save Area</a>';}
if($.inArray(page,pagestosaveroutemap)>-1)
{saveloadtype="Route Map";document.getElementById("li_user_save").hidden=false;document.getElementById("li_user_load").hidden=false;document.getElementById("li_user_load").innerHTML='<a href="#" onclick="ftn_user_load();" title="Loads a route map from memory">Load Route Map ('+ftn_countsaved()+')</a>';document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves a route map to memory">Save Route Map</a>';}
if($.inArray(page,pagestosaveconcentriccircle)>-1)
{saveloadtype="Concentric Circle";document.getElementById("li_user_save").hidden=false;document.getElementById("li_user_load").hidden=false;document.getElementById("li_user_load").innerHTML='<a href="#" onclick="ftn_user_load();" title="Loads a concentric circle from memory">Load C-Circle ('+ftn_countsaved()+')</a>';document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves a concentric circle to memory">Save C-Circle</a>';}
if($.inArray(page,pagestosaveradius)>-1)
{saveloadtype="Radius";document.getElementById("li_user_save").hidden=false;document.getElementById("li_user_load").hidden=false;document.getElementById("li_user_load").innerHTML='<a href="#" onclick="ftn_user_load();" title="Loads a radius from memory">Load Radius ('+ftn_countsaved()+')</a>';document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves a radius to memory">Save Radius</a>';}
if($.inArray(page,pagestosaveroute)>-1)
{saveloadtype="Route";document.getElementById("li_user_save").hidden=false;if((page=="how-far-is-it-between.htm")||(page=="distance-between-uk-postcodes.htm"))
{document.getElementById("li_user_load").hidden=true;}
else
{document.getElementById("li_user_load").hidden=false;}
document.getElementById("li_user_load").innerHTML='<a href="#" onclick="ftn_user_load();" title="Loads a route from memory">Load Route ('+ftn_countsaved()+')</a>';document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves a route to memory">Save Route</a>';}
if(!(document.all&&!document.addEventListener))
{document.getElementById("li_user_removedata").innerHTML='<li id="li_user_removedata"><a href="#" onclick="ftn_user_removedata();" title="Removes all your data from memory">Remove All User Data</a></li>';}}
function ftn_user_load()
{if(localStorage.fmtuserdata)
{xmlDoc=xmlreader(localStorage.fmtuserdata);dialog_usermenu=$("#modal-dialog").dialog('option','title','Load '+saveloadtype);var html="<h3>Select "+saveloadtype+" to Load:</h3>";html+="<p>Click the name to load or the X to delete.</p>";html+="<table>";html+="<tr>";html+="<td><strong>Name</strong</td>";html+="<td><strong>Date Saved</strong</td>";html+="<td>Delete</td>";html+="<td>Link</td>";html+="</tr>";var items=xmlDoc.getElementsByTagName(saveloadtype.toLowerCase().replace(" ",""));for(var i=0;i<items.length;i++)
{var tmpName="---";var tmpNameNode=items[i].getElementsByTagName("name")[0].childNodes[0];if(tmpNameNode)
{tmpName=tmpNameNode.nodeValue;}
var tmpDateTimeSaved="---";var tmpDateTimeSavedNode=items[i].getElementsByTagName("datetimesaved")[0].childNodes[0];if(tmpDateTimeSavedNode)
{tmpDateTimeSaved=tmpDateTimeSavedNode.nodeValue;}
html+="<tr>";html+="<td><a href='#' onclick='ftn_load("+i+")'>"+tmpName+"</a></td>";html+="<td>"+tmpDateTimeSaved+"</td>";html+="<td align='center'><a href='#' onclick='ftn_delete("+i+")'><img src='images/redX.png' alt='Delete'/></a></td>";html+="<td align='center'><a href='#' onclick='ftn_generatelink("+i+")'><img src='images/link-icon.png' alt='Generate Link'/></a></td>";html+="</tr>";}
html+="</table>";var options={height:300,buttons:{Cancel:function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);}
else
{dialog_usermenu.dialog('option','title','Load '+saveloadtype);var html="<h3>Select "+saveloadtype+" to Load:</h3>";html+="<p>No "+saveloadtype+" to load.</p>";var options={height:300,buttons:{"OK":function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);}
dialog_usermenu.html(html);dialog_usermenu.bind('dialogclose',function(event)
{});dialog_usermenu.dialog("open");}
function ftn_user_save()
{document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" >Saving</a>';if(typeof FMTkmlcoordinates!=='undefined')
{dialog_usermenu.dialog('option','title','Save '+saveloadtype);var html="<h4>Give this "+saveloadtype.toLowerCase()+" a name then click Save:</h4>";html+="<p>Name : <input type='text' name='name' id='tbName' size='18'></p>";dialog_usermenu.html(html);var options={height:200,buttons:{"Save":savefrommodal,Cancel:function(){dialog_usermenu.dialog("close");document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves the '+saveloadtype.toLowerCase()+' created on this page to memory">Save '+saveloadtype+'</a>';}}};dialog_usermenu.dialog('option',options);dialog_usermenu.bind('dialogclose',function(event)
{document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves the '+saveloadtype.toLowerCase()+' created on this page to memory">Save '+saveloadtype+'</a>';});}
else
{dialog_usermenu.dialog('option','title','Save '+saveloadtype);var html="<h4>Error! No "+saveloadtype.toLowerCase()+" drawn yet</h4>";html+="<p>Draw the "+saveloadtype.toLowerCase()+" on the map then save.</p>";dialog_usermenu.html(html);var options={height:200,buttons:{"OK":function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);dialog_usermenu.bind('dialogclose',function(event)
{document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" title="Saves the '+saveloadtype.toLowerCase()+' created on this page to memory">Save '+saveloadtype+'</a>';});}
dialog_usermenu.dialog("open");}
function ftn_user_exportdata()
{console.log("ftn_user_exportdata");if(localStorage.fmtuserdata)
{ftn_saveXML(localStorage.fmtuserdata);document.getElementById("li_user_exportdata").innerHTML='<a href="#" onclick="ftn_user_exportdata();">Exporting...</a>';}
else
{dialog_usermenu.dialog('option','title','Export Data Error');var html="<h4>Error! No Data</h4>";html+="<p>There is no data to save.</p>";dialog_usermenu.html(html);var options={height:200,buttons:{"OK":function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);dialog_usermenu.bind('dialogclose',function(event)
{document.getElementById("li_user_exportdata").innerHTML='<a href="#" onclick="ftn_user_exportdata();">Export Data</a>';});dialog_usermenu.dialog("open");}}
function ftn_user_removedata()
{dialog_usermenu.dialog('option','title','Remove User Data');var html="<h4>Are You Sure?</h4>";html+="<p>Are you sure you wish to remove all data stored locally? You will not be able to load any saved data after this.</p>";dialog_usermenu.html(html);var options={height:250,buttons:{"Yes":function(){dialog_usermenu.dialog("close");ftn_user_removedata_process();},Cancel:function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);dialog_usermenu.dialog("open");}
function ftn_user_removedata_process()
{localStorage.removeItem("fmtuserdata");document.getElementById("li_user_removedata").innerHTML='<li id="li_user_removedata"><a href="#" onclick="ftn_user_removedata();" title="Removes all your data from memory">Removing...</a></li>';setTimeout(function(){ftn_loadcontext();},1000);}
function ftn_user_settings()
{dialog_usermenu.dialog('option','title','User Settings');var html="<h4>Marker Size</h4>";html+="<span>";html+="<input type='radio' id='markersize1' name='markersize' onclick='ftn_markersize_changed(1);'>Large";html+="<br/>";html+="<input type='radio' id='markersize2' name='markersize' onclick='ftn_markersize_changed(0.7);'>Medium";html+="<br/>";html+="<input type='radio' id='markersize3' name='markersize' onclick='ftn_markersize_changed(0.5);'>Small";html+="<h4>Marker Opacity</h4>";html+="<input id='opacity' type='range' min='0' value='1' max='1' step='0.1' oninput='ftn_opacity_change(this.value)' onchange='ftn_opacity_change(this.value)' /></span>";html+="<span id='span_marker_demo' style='float:right;'><img id='img_marker_demo' src='images/markers/freemaptools.png' width='30px' /></span>";html+="<h4>Units Preference</h4>";html+="<p>Which units of measurement do you prefer?</p>";html+="<div class='settingstoggleunits'>";html+="<input type='checkbox' name='settingsswitchunits' class='settingstoggleunits-checkbox' id='settingsswitchunits' checked>";html+="<label class='settingstoggleunits-label' for='settingsswitchunits'>";html+="<span class='settingstoggleunits-inner'></span>";html+="<span class='settingstoggleunits-switch'></span>";html+="</label>";html+="</div>";var options={height:450,buttons:{"Apply":function(){FMTmarkersizefactor=newFMTmarkersizefactor;FMTmarkeropacity=newFMTmarkeropacity;if(document.getElementById("settingsswitchunits").checked){settings_unit_handler=KMS;}else{settings_unit_handler=MILES;}
xmlbuilder_initialise(xmlbuilderversion);xmlDoc=xmlreader(localStorage.fmtuserdata);xmlDoc.getElementsByTagName("fmtuserdata")[0].attributes["unitssetting"].value=settings_unit_handler.label;var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;var element=document.getElementById('span_unitssetting');if(typeof(element)!='undefined'&&element!=null)
{element.innerHTML=settings_unit_handler.label;}
dialog_usermenu.dialog("close");},Cancel:function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);dialog_usermenu.html(html);dialog_usermenu.dialog({open:function(event,ui)
{if(settings_unit_handler==KMS)
{document.getElementById("settingsswitchunits").checked=true;dialog_usermenu.dialog({open:function(event,ui){}});}
else
{document.getElementById("settingsswitchunits").checked=false;dialog_usermenu.dialog({open:function(event,ui){}});}}});dialog_usermenu.dialog("open");newFMTmarkersizefactor=FMTmarkersizefactor;newFMTmarkeropacity=FMTmarkeropacity;ftn_markersize_loaded();document.getElementById('opacity').value=FMTmarkeropacity;}
function ftn_opacity_change(opacity)
{document.getElementById('span_marker_demo').style.opacity=opacity;newFMTmarkeropacity=Number(opacity);}
function ftn_markersize_loaded()
{if(FMTmarkersizefactor==1)
{document.getElementById('markersize1').checked=true;}
if(FMTmarkersizefactor==0.7)
{document.getElementById('markersize2').checked=true;}
if(FMTmarkersizefactor==0.5)
{document.getElementById('markersize3').checked=true;}}
function ftn_markersize_changed(value)
{newFMTmarkersizefactor=value;document.getElementById('img_marker_demo').style.height=(34*value)+'px';}
function ftn_user_importdata(msg)
{console.log("ftn_user_importdata");dialog_usermenu.dialog('option','title','Import Data');var html="<h4>Import User Data</h4>";if(msg)
{html+="<p><span style='color:#ff0000'>"+msg+"</span></p>";}
html+="<form id='uploadform' action='iframe/user-menu-process-xml-upload.php' method='post' enctype='multipart/form-data' target='user-menu-uploadframe'>";html+="<p>Browse for the XML file...</p>";html+="<p><input type='file' name='myfile' id='myfile' accept='.xml'></p>";html+="</form>";dialog_usermenu.html(html);var options={height:270,buttons:{"Load":ftn_uploadxml,Cancel:function(){dialog_usermenu.dialog("close");}}};dialog_usermenu.dialog('option',options);dialog_usermenu.dialog("open");}
function ftn_uploadxml()
{console.log("uploading...");document.getElementById('uploadform').submit();}
function finishedloadingxml(xmldata)
{xmlDoc=xmlreader(decodeURIComponent(xmldata));if(typeof xmlDoc.getElementsByTagName("fmtuserdata")[0]!=='undefined')
{localStorage.fmtuserdata=decodeURIComponent(xmldata);dialog_usermenu.dialog("close");ftn_loadcontext();console.log("Uploaded");}
else
{console.log("Error Uploading");localStorage.fmtuserdata="";ftn_user_importdata("Error Uploading : Issue with XML format");}}
function xmlreader(txt)
{if(window.DOMParser)
{parser=new DOMParser();xmlDoc=parser.parseFromString(txt,"text/xml");}
else
{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;xmlDoc.loadXML(txt);}
return xmlDoc;}
function xmlbuilder_addarea(areaname,FMTkmlcoordinates)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var new_area=xmlDoc.createElement("area");new_area_name=xmlDoc.createElement("name");new_area_name_text=xmlDoc.createTextNode(areaname);new_area_name.appendChild(new_area_name_text);new_area_datetimesaved=xmlDoc.createElement("datetimesaved");new_area_datetimesaved_text=xmlDoc.createTextNode(getDateTime());new_area_datetimesaved.appendChild(new_area_datetimesaved_text);new_area_data=xmlDoc.createElement("areadata");var splitted=FMTkmlcoordinates.split(' ');for(i=0;i<splitted.length-1;i++)
{new_area_data_point=xmlDoc.createElement("point");new_area_data_point_text=xmlDoc.createTextNode(splitted[i].replace(",0",""));new_area_data_point.appendChild(new_area_data_point_text);new_area_data.appendChild(new_area_data_point);}
new_area.appendChild(new_area_name);new_area.appendChild(new_area_datetimesaved);new_area.appendChild(new_area_data);x=xmlDoc.getElementsByTagName("fmtuserdata")[0];x.appendChild(new_area);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;}
function xmlbuilder_addradius(name,centre,radiuskm)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var new_area=xmlDoc.createElement("radius");new_area_name=xmlDoc.createElement("name");new_area_name_text=xmlDoc.createTextNode(name);new_area_name.appendChild(new_area_name_text);new_area_datetimesaved=xmlDoc.createElement("datetimesaved");new_area_datetimesaved_text=xmlDoc.createTextNode(getDateTime());new_area_datetimesaved.appendChild(new_area_datetimesaved_text);new_area_radius=xmlDoc.createElement("radiuskm");new_area_radius_text=xmlDoc.createTextNode(radiuskm);new_area_radius.appendChild(new_area_radius_text);if(typeof google==='object'&&typeof google.maps==='object'){new_area_radius_lat=xmlDoc.createElement("centerlat");new_area_radius_lat_text=xmlDoc.createTextNode(centre.lat());new_area_radius_lat.appendChild(new_area_radius_lat_text);new_area_radius_lng=xmlDoc.createElement("centerlng");new_area_radius_lng_text=xmlDoc.createTextNode(centre.lng());new_area_radius_lng.appendChild(new_area_radius_lng_text);}
else{new_area_radius_lat=xmlDoc.createElement("centerlat");new_area_radius_lat_text=xmlDoc.createTextNode(centre.lat);new_area_radius_lat.appendChild(new_area_radius_lat_text);new_area_radius_lng=xmlDoc.createElement("centerlng");new_area_radius_lng_text=xmlDoc.createTextNode(centre.lng);new_area_radius_lng.appendChild(new_area_radius_lng_text);}
new_area.appendChild(new_area_name);new_area.appendChild(new_area_datetimesaved);new_area.appendChild(new_area_radius);new_area.appendChild(new_area_radius_lat);new_area.appendChild(new_area_radius_lng);x=xmlDoc.getElementsByTagName("fmtuserdata")[0];x.appendChild(new_area);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;}
function xmlbuilder_addroutemap(routename,FMTkmlcoordinates)
{console.log("xmlbuilder_addroute");xmlNodeToAdd=xmlreader(FMTkmlcoordinates).getElementsByTagName("routes")[0];console.log(xmlNodeToAdd);xmlDoc=xmlreader(localStorage.fmtuserdata);var new_route=xmlDoc.createElement("routemap");new_route_name=xmlDoc.createElement("name");new_route_name_text=xmlDoc.createTextNode(routename);new_route_name.appendChild(new_route_name_text);new_route_datetimesaved=xmlDoc.createElement("datetimesaved");new_route_datetimesaved_text=xmlDoc.createTextNode(getDateTime());new_route_datetimesaved.appendChild(new_route_datetimesaved_text);new_route.appendChild(new_route_name);new_route.appendChild(new_route_datetimesaved);var otherNode=xmlDoc.importNode(xmlNodeToAdd,true);new_route.appendChild(otherNode);x=xmlDoc.getElementsByTagName("fmtuserdata")[0];x.appendChild(new_route);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;console.log(xmlDoc);}
function xmlbuilder_addroute(routename,FMTkmlcoordinates)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var new_route=xmlDoc.createElement("route");new_route_name=xmlDoc.createElement("name");new_route_name_text=xmlDoc.createTextNode(routename);new_route_name.appendChild(new_route_name_text);new_route_datetimesaved=xmlDoc.createElement("datetimesaved");new_route_datetimesaved_text=xmlDoc.createTextNode(getDateTime());new_route_datetimesaved.appendChild(new_route_datetimesaved_text);new_route_data=xmlDoc.createElement("routedata");var splitted=FMTkmlcoordinates.split(' ');for(i=0;i<splitted.length-1;i++)
{new_route_data_point=xmlDoc.createElement("point");new_route_data_point_text=xmlDoc.createTextNode(splitted[i].replace(",0",""));new_route_data_point.appendChild(new_route_data_point_text);new_route_data.appendChild(new_route_data_point);}
new_route.appendChild(new_route_name);new_route.appendChild(new_route_datetimesaved);new_route.appendChild(new_route_data);x=xmlDoc.getElementsByTagName("fmtuserdata")[0];x.appendChild(new_route);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;}
function xmlbuilder_addconcentriccircle(name,data)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var new_ccircle=xmlDoc.createElement("concentriccircle");new_ccircle_name=xmlDoc.createElement("name");new_ccircle_name_text=xmlDoc.createTextNode(name);new_ccircle_name.appendChild(new_ccircle_name_text);new_ccircle_datetimesaved=xmlDoc.createElement("datetimesaved");new_ccircle_datetimesaved_text=xmlDoc.createTextNode(getDateTime());new_ccircle_datetimesaved.appendChild(new_ccircle_datetimesaved_text);new_ccircle_data=xmlDoc.createElement("ccircle");for(var row in data)
{new_ccircle_data_point=xmlDoc.createElement("ccirclerow");new_ccircle_data_point_text=xmlDoc.createTextNode(data[row]);new_ccircle_data_point.appendChild(new_ccircle_data_point_text);new_ccircle_data.appendChild(new_ccircle_data_point);}
new_ccircle.appendChild(new_ccircle_name);new_ccircle.appendChild(new_ccircle_datetimesaved);new_ccircle.appendChild(new_ccircle_data);x=xmlDoc.getElementsByTagName("fmtuserdata")[0];x.appendChild(new_ccircle);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;}
function xmlbuilder_initialise(version)
{if(!localStorage.fmtuserdata)
{var txt;txt="<?xml version='1.0'?><fmtuserdata v='"+version+"' datetimecreated='"+getDateTime()+"' datetimelastsaved='"+getDateTime()+"' unitssetting='"+settings_unit_handler.label+"'>";txt=txt+"</fmtuserdata>";localStorage.fmtuserdata=txt;}}
function xmlbuilder_terminate()
{xmlDoc=xmlreader(localStorage.fmtuserdata);xmlDoc.getElementsByTagName("fmtuserdata")[0].attributes["datetimelastsaved"].value=getDateTime();var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;}
function populateIframe(id,path)
{var ifrm=document.getElementById(id);ifrm.src="https://www.freemaptools.com/ajax/download.php?path="+path;}
function ftn_saveXML(xmlbuild)
{var xmlhttp=false;try
{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e)
{try
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(E)
{xmlhttp=false;}}
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){xmlhttp=new XMLHttpRequest();}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4)
{populateIframe('user-menu-downloadframe',xmlhttp.responseText);document.getElementById("li_user_exportdata").innerHTML='<a href="#" onclick="ftn_user_exportdata();">Exported</a>';setTimeout(function(){document.getElementById("li_user_exportdata").innerHTML='<a href="#" onclick="ftn_user_exportdata();">Export Data</a>';},2000);}};var params;params="rand="+Math.floor(Math.random()*9999);params+="&xml="+xmlbuild;xmlhttp.open("POST","ajax/savexmlusingpost.php",true);xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");xmlhttp.send(params);}
function loadfrommodal(){dialog_usermenu.dialog("close");}
function savefrommodal()
{var name=$("#tbName").val();xmlbuilder_initialise(xmlbuilderversion);if(saveloadtype=="Route Map")
{if(FMTkmlcoordinates)
{xmlbuilder_addroutemap(name,FMTkmlcoordinates);}}
if(saveloadtype=="Area")
{if(FMTkmlcoordinates)
{xmlbuilder_addarea(name,FMTkmlcoordinates);}}
if(saveloadtype=="Radius")
{if(page=="radius-around-point.htm")
{if(radiusWidgets)
{FMTradiuskm=radiusWidgets[radiusWidgets.length-1].get('distance');}
FMTradiuscentre=arrPoints[arrPoints.length-1];}
xmlbuilder_addradius(name,FMTradiuscentre,FMTradiuskm);}
if(saveloadtype=="Route")
{if(FMTkmlcoordinates)
{xmlbuilder_addroute(name,FMTkmlcoordinates);}}
if(saveloadtype=="Concentric Circle")
{if(FMTkmlcoordinates)
{xmlbuilder_addconcentriccircle(name,FMTkmlcoordinates);}}
xmlbuilder_terminate();document.getElementById("li_user_save").innerHTML='<a href="#" onclick="ftn_user_save();" >Saved</a>';ftn_loadcontext();dialog_usermenu.dialog("close");}
function saveforXML()
{console.log("saveforXML()");var name="";xmlbuilder_initialise(xmlbuilderversion);if(saveloadtype=="Area")
{if(FMTkmlcoordinates)
{xmlbuilder_addarea(name,FMTkmlcoordinates);}}
if(saveloadtype=="Radius")
{if(page=="radius-around-point.htm")
{if(radiusWidgets)
{FMTradiuskm=radiusWidgets[radiusWidgets.length-1].get('distance');}
FMTradiuscentre=arrPoints[arrPoints.length-1];}
xmlbuilder_addradius(name,FMTradiuscentre,FMTradiuskm);}
if(saveloadtype=="Route")
{if(FMTkmlcoordinates)
{xmlbuilder_addroute(name,FMTkmlcoordinates);}}
if(saveloadtype=="Concentric Circle")
{if(FMTkmlcoordinates)
{xmlbuilder_addconcentriccircle(name,FMTkmlcoordinates);}}
xmlbuilder_terminate();}
function ftn_countsaved()
{if(localStorage.fmtuserdata)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var areas=xmlDoc.getElementsByTagName(saveloadtype.toLowerCase().replace(" ",""));return areas.length;}
else
{return 0;}}
function ftn_load(loadindex)
{dialog_usermenu.dialog("close");if(loadindex==-1)
{xmlDoc=xmlreader(localStorage.fmtloaddata);loadindex=0;}
else
{xmlDoc=xmlreader(localStorage.fmtuserdata);}
var loaditem=xmlDoc.getElementsByTagName(saveloadtype.toLowerCase().replace(" ",""))[loadindex];var xmlString=(new XMLSerializer()).serializeToString(loaditem);var datetimesaved=loaditem.getElementsByTagName("datetimesaved")[0].childNodes[0].nodeValue;var tmpName="---";var tmpNameNode=loaditem.getElementsByTagName("name")[0].childNodes[0];if(tmpNameNode)
{tmpName=tmpNameNode.nodeValue;}
var itemname=tmpName;console.log(saveloadtype);if(saveloadtype=="Radius")
{var radiuskm=loaditem.getElementsByTagName("radiuskm")[0].childNodes[0].nodeValue;var centerlat=loaditem.getElementsByTagName("centerlat")[0].childNodes[0].nodeValue;var centerlng=loaditem.getElementsByTagName("centerlng")[0].childNodes[0].nodeValue;var point;if(typeof google==='object'&&typeof google.maps==='object'){point=new google.maps.LatLng(parseFloat(centerlat),parseFloat(centerlng));}
else{point=L.latLng(parseFloat(centerlat),parseFloat(centerlng))}
ftnResetMap();if(page=="find-population.htm")
{clickmode=2;radius_km=radiuskm;var mev={stop:null,latLng:point};google.maps.event.trigger(map,'click',mev);}
else
{if(document.getElementById("radiusinputkm"))
{document.getElementById("radiusinputkm").value=radiuskm;}
if(document.getElementById("tb_radius"))
{document.getElementById("tb_radius").value=radiuskm;}
if(document.getElementById("tb_radiuskm"))
{document.getElementById("tb_radiuskm").value=radiuskm;}
if(typeof(startdraw)=='function'){startdraw(point);}
else{placeMarkerAtPoint(point);}}}
if(saveloadtype=="Area")
{var areadata=(loaditem.getElementsByTagName("areadata")[0]);var xmlString=(new XMLSerializer()).serializeToString(areadata);ftnResetMap();if(page=="find-population.htm")
{clickmode=1;}
var arr_points=areadata.getElementsByTagName('point');for(var i=0;i<arr_points.length;i++)
{var arr_latlng=arr_points[i].childNodes[0].nodeValue.split(",");if(page=="area-calculator.htm")
{areacontainer[areacontainer.length-1].push(new google.maps.LatLng(arr_latlng[1],arr_latlng[0]))}
else
{if(typeof google==='object'&&typeof google.maps==='object'){points.push(new google.maps.LatLng(arr_latlng[1],arr_latlng[0]));}
else{points.push(L.latLng(arr_latlng[1],arr_latlng[0]));}}}}
if(saveloadtype=="Route")
{var routedata=(loaditem.getElementsByTagName("routedata")[0]);var xmlString=(new XMLSerializer()).serializeToString(routedata);ftnResetMap();var arr_points=routedata.getElementsByTagName('point');for(var i=0;i<arr_points.length;i++)
{var arr_latlng=arr_points[i].childNodes[0].nodeValue.split(",");if(typeof google==='object'&&typeof google.maps==='object'){clickatpoint(new google.maps.LatLng(arr_latlng[1],arr_latlng[0]));}
else{var e={};e['latlng']=L.latLng(arr_latlng[1],arr_latlng[0]);clickatpoint(e);}}}
if(saveloadtype=="Concentric Circle")
{var ccircledata=(loaditem.getElementsByTagName("ccircle")[0]);var xmlString=(new XMLSerializer()).serializeToString(ccircledata);var arr_points=ccircledata.getElementsByTagName('ccirclerow');var tmp_boxbuild="";for(var i=0;i<arr_points.length;i++)
{tmp_boxbuild+=arr_points[i].childNodes[0].nodeValue+"\n";}
document.getElementById('ta_inputdata').value=tmp_boxbuild.substring(0,tmp_boxbuild.length-1);makeconcentriccircles();}
if(saveloadtype=="Route Map")
{var routemapdata=(loaditem.getElementsByTagName("routes")[0]);var xmlString=(new XMLSerializer()).serializeToString(routemapdata);console.log(xmlString);routesnode=xmlreader(xmlString);processXML(routesnode,"");}
if(typeof(ftn_display)=='function'){ftn_display();};if(typeof(ftn_zoomtofit)=='function'){ftn_zoomtofit();};}
function ftn_delete(loadindex)
{xmlDoc=xmlreader(localStorage.fmtuserdata);var loaditem=xmlDoc.getElementsByTagName(saveloadtype.toLowerCase().replace(" ",""))[loadindex];loaditem.parentNode.removeChild(loaditem);var xmlString=(new XMLSerializer()).serializeToString(xmlDoc);localStorage.fmtuserdata=xmlString;ftn_loadcontext();ftn_user_load();}
function ftn_generatelink(loadindex)
{var loaditem=xmlDoc.getElementsByTagName(saveloadtype.toLowerCase().replace(" ",""))[loadindex];var xmlString=(new XMLSerializer()).serializeToString(loaditem);var txt;txt="<?xml version='1.0'?><fmtuserdata v='"+xmlbuilderversion+"' datetimecreated='"+getDateTime()+"' datetimelastsaved='"+getDateTime()+"'>";txt=txt+xmlString;txt=txt+"</fmtuserdata>";txt=encodeURIComponent(txt);var page;page=window.location.href.substring(window.location.href.indexOf("freemaptools.com/")+17,window.location.href.indexOf(".htm"));findtinyurl("https://www.freemaptools.com/load.php?p="+page+"&x="+txt);}
function findtinyurl(params)
{console.log(params);var rn=Math.floor(Math.random()*9999);$.ajax({url:'ajax/generate-tinyurl.php',type:'POST',data:{'url':params},dataType:'text',success:function(result){console.log(result);var tinyurl=result;dialog_usermenu.dialog("close");dialog_copytinyurl=$("#modal-dialog").dialog('option','title','Copy URL link');var html="<h3>Copy URL link</h3>";html+="<p>Copy the link below to share</p>";html+="<p><input type='text' name='tb_tinyurl' size='22' onclick='this.select()' value='"+tinyurl+"'/></p>";var options={height:300,buttons:{Cancel:function(){dialog_usermenu.dialog("close");}}};dialog_copytinyurl.dialog('option',options);dialog_usermenu.html(html);dialog_usermenu.bind('dialogclose',function(event)
{});dialog_usermenu.dialog("open");},error:function(x,y,z){console.log(y);}});}
function ftn_pageloaded()
{console.log("ftn_pageloaded");if(localStorage.fmtloaddata)
{if(localStorage.fmtloaddata!="null")
{xmlDoc=xmlreader(localStorage.fmtloaddata);console.log(xmlDoc);if(typeof xmlDoc.getElementsByTagName("fmtuserdata")[0]!=='undefined')
{ftn_load(-1);localStorage.fmtloaddata=null;}}}}