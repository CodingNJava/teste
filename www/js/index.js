var myLocation;
var dist;
var tipo;
var map;
var markers = new Array();

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        StatusBar.overlaysWebView(false);
    },

    onSuccess: function(position) {

        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        myLocation = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: myLocation,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: map.getCenter(),
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 6
            },
            draggable: true,
            map: map
        });
    },

    onError: function(error) {
        alert("cod erro " + error.code + ". \n" +
            "mensagem: " + error.message);
    },

    getLocations: function() {
        tipo = document.getElementById("tipo").value;
        dist = document.getElementById("dist").value;

        if (tipo == "default") {
            alert("Escolha um tipo de local");
        } else {
            findPlaces();
        }
    },

    findPlaces: function() {
        var request = {
            location: myLocation,
            radius: dist,
            types: [tipo]
        };
        alert(myLocation);
        var service = new google.maps.places.PlacesService(map);
        service.search(request, createMarkers);
    },

    createMarkers: function(response, status) {
        var latlngbounds = new google.maps.LatLngBounds();
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            for (var i = 0; i < response.length; i++) {
                drawMarker(response[i]);
                latlngbounds.extend(response[i].geometry.location);
            }
            map.fitBounds(latlngbounds);
        } else {
            alert("Erro!!!");
        }
    },

    drawMarker: function(obj) {
        var marker = new google.maps.Marker({
            position: obj.geometry.location,
            map: map
        });
        markers.push(marker);

        var infoWindow = new google.maps.infoWindow({
            content: '<img src="' + obj.icon +
                '"/><font style="color:gray">' + obj.name +
                '<br/>Rating: ' + obj.rating +
                '<br/>Vicinity: ' + obj.vicinity +
                '</font>'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });
    },

    clearMarkers: function() {
        if (markers) {
            for (i in markers) {
                markers[i].setMap(null);
            }
            markers = [];
        }
    },

};
app.initialize();