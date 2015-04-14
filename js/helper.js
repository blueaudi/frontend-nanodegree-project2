var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="role">%data%</span><hr/>';
var HTMLcontactGeneric = '<li class="flex-item"><span class="white-text">%contact%</span><span class="gold-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="white-text">mobile</span><span class="gold-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="white-text">email</span><span class="gold-text"><a href="mailto:%data%" class="inline gold-text">%data%</a></span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="white-text">twitter</span><span class="gold-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="white-text">github</span><span class="gold-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="white-text">blog</span><span class="gold-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="white-text">location</span><span class="gold-text">%data%</span></li>';

var HTMLbioPic = '<div class="biopic-container"><img src="%data%" class="biopic curved-edges" alt="Glenn Hepler photo"></div>';
var HTMLWelcomeMsg = '<span class="welcome-message flex-box-100">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#" class="burgundy-text-bold">%data%';
var HTMLworkLocation = ' (%data%)</a>';
var HTMLworkTitle = '<div class="title-text">%data%</div>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkDescription = '<p><em>%data%</em></p>';
var HTMLworkDutiesStart = '<ul class="duties-entry"></ul>';
var HTMLworkDuties = '<li class="">%data%</li>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#" class="burgundy-text-bold">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<div class="project-description">%data%</div>';
var HTMLprojectImage = '<img src="%data%" class="project-img" title="%title%" alt="%alt%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#" class="burgundy-text-bold">%data%';
var HTMLschoolLocation = ' (%data%)</a>';
var HTMLschoolDegree = '<div class="degree-text">%data%</div>';
var HTMLschoolGPA = '<div class="GPA-text">Cumulative GPA:&nbsp;&nbsp;%data%</div>';
var HTMLschoolDates = '<div class="date-text">Graduation date:&nbsp;&nbsp;%data%</div>';
var HTMLschoolMajor = '<div class="major-text">Major:&nbsp;&nbsp;%data%<div>';
var HTMLschoolHonors = '<div class="honors-text">Honors:&nbsp;&nbsp;%data%</div>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" class="burgundy-text-bold">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<a href="%url%" target="_blank" class="course-url">%data%</a>';

var googleMap = '<div id="map"></div>';

/*
Collect screen clicks and log the locations to the console.
*/
clickLocations = [];

function logClicks(x,y) {
	clickLocations.push(
		{
			x: x,
			y: y
		}
	);
	console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
	var x = loc.pageX;
	var y = loc.pageY;
	logClicks(x, y);
});

/*
Generate custom Google Map with location markers.
*/
var map;

function initializeMap() {
	var locations;
	var mapOptions = {
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.querySelector('#map'), mapOptions);

	/*
	locationFinder() returns an array of every location string from the JSONs
	written for bio, education, and work.
	*/
	function locationFinder() {
		var locations = [];
		locations.push(bio.contacts.location);
		for (var school in education.schools) {
			locations.push(education.schools[school].location);
		}
		for (var job in work.jobs) {
			locations.push(work.jobs[job].location);
		}
		return locations;
	}

	/*
	createMapMarker(placeData) reads Google Places search results to create map pins.
	placeData is the object returned from search results containing information
	about a single location.
	*/
	function createMapMarker(placeData) {
		var lat = placeData.geometry.location.k;  // latitude from the place service
		var lon = placeData.geometry.location.D;  // longitude from the place service
		var name = placeData.formatted_address;   // name of the place from the place service
		var bounds = window.mapBounds;            // current boundaries of the map window

		var marker = new google.maps.Marker({
			map: map,
			position: placeData.geometry.location,
			title: name
		});
		var marker_text = name;
		if (marker_text === "High Point, NC, USA") {
			marker_text = "<b>High Point, NC</b> - the city of my birth and current residence, site of High Point University (pictured) - approx. population 108,000.<br><img class='marker' src='images/HighPoint,NC.jpg'>";
		} else if (marker_text === "Raleigh, NC, USA") {
			marker_text = "<b>Raleigh, NC</b> - capital of North Carolina and site of North Carolina State University - approx. population 432,000.<br><img class='marker' src='images/Raleigh,NC.jpg'>";
		}
		var infoWindow = new google.maps.InfoWindow({
			maxWidth: 360,
			content: "<span id='infoWindow'>" + marker_text + "</span>"
		});

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(infoWindow, 'closeclick', function() {
			map.setCenter(bounds.getCenter());
		});

		// Add location pin to map and center
		bounds.extend(new google.maps.LatLng(lat, lon));
		map.fitBounds(bounds);
		map.setCenter(bounds.getCenter());
	}

	/*
	callback(results, status) makes sure the search returned results for a location.
	If so, it creates a new map marker for that location.
	*/
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMapMarker(results[0]);
		}
	}

	/*
	pinPoster() takes in the array of locations created by locationFinder()
	and fires off Google place searches for each location
	*/
	function pinPoster(locations) {
		var service = new google.maps.places.PlacesService(map);
		for (var place in locations) {
			var request = {
				query: locations[place]
			};
			service.textSearch(request, callback);
		}
	}

	window.mapBounds = new google.maps.LatLngBounds();
	locations = locationFinder();
	pinPoster(locations);

}

window.addEventListener('load', initializeMap);

// Listen for window resizing and adjust map bounds accordingly
window.addEventListener('resize', function(e) {
	map.fitBounds(mapBounds);
});