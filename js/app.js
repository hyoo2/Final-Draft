/**
 * Created by marcocheng on 11/26/14.
 */
$(document).ready(function() {

    $('#signUp').click(function() {
        alert('it works');
    });

    $('#login').click(function() {
        alert('it works');
    });

    $('body').scrollspy({ target: '.navbar-custom' });


    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });


    $('#fullpage').fullpage({
        sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000']
    });

    var map;
    var geocoder;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
//    var addr1 = 'University of Washington, Seattle, WA';
//    var addr2 = "Seattle University, Seattle, WA";
    var addr1;
    var addr2;
    var mode;
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };
    map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    //We need to set start and end destinations, as well as travel mode.
    //This should be done in the initialize function
    $("#calculate").click(function() {
        initialize();
        addr1 = $("#startaddress").val();
        addr2 = $("#endaddress").val();
        placeMarkers();
        calcRoute();
        calculateDistances();
    });

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var center = {
            lat: 47.6,
            lng: -122.3
        };
        map = new google.maps.Map(mapElem, {
            center: center,
            zoom: 12
        });
        geocoder = new google.maps.Geocoder();
        directionsDisplay.setMap(map);
        mode = "DRIVING";
        addr1 = "";
        addr2 = "";
    }

    function placeMarkers() {
        geocoder.geocode({address: addr1}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = results[0].geometry.location;
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map
                });
            }

        });
        geocoder.geocode({address: addr2}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = results[0].geometry.location;
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map
                });
            }

        });
    }

    function calcRoute() {
        var request = {
            origin:addr1,
            destination: addr2,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if(status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }

    function calculateDistances() {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix ({
            origins: [addr1],
            destinations: [addr2],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, callback);
    }

    function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = '';

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {

                   if(status == google.maps.DirectionMatrixStatus.NOT_FOUND) {
                       alert('Not Valid');
                   }

                    outputDiv.innerHTML += origins[i] + ' to ' + destinations[j]
                        + ': ' + results[j].distance.text + ' in '
                        + results[j].duration.text + '<br>';
                    calculateEmissions(results[j].distance.value);
                }
            }
        }
    }

    function calculateEmissions(distance) {
        var result = 0;
        if(mode == "DRIVING") {
            result = (0.96 * distance);
        } else if(mode == "TRANSIT") {
            result = (0.64 * distance);
        }
        var total = (result / 1609.344);
        var value = total.toFixed(2);
        var emissions = document.getElementById('emissions');
        emissions.innerHTML = "Total emissions: " + value;
    }
});

//
//$(document).ready(function() {
//    $('#fullpage').fullpage({
//        //Navigation
//        menu: false,
//        anchors:['firstSlide', 'secondSlide'],
//        navigation: false,
//        navigationPosition: 'right',
//        navigationTooltips: ['firstSlide', 'secondSlide'],
//        slidesNavigation: true,
//        slidesNavPosition: 'bottom',
//
//        //Scrolling
//        css3: true,
//        scrollingSpeed: 700,
//        autoScrolling: true,
//        scrollBar: false,
//        easing: 'easeInQuart',
//        easingcss3: 'ease',
//        loopBottom: false,
//        loopTop: false,
//        loopHorizontal: true,
//        continuousVertical: false,
//        normalScrollElements: '#element1, .element2',
//        scrollOverflow: false,
//        touchSensitivity: 15,
//        normalScrollElementTouchThreshold: 5,
//
//        //Accessibility
//        keyboardScrolling: true,
//        animateAnchor: true,
//
//        //Design
//        verticalCentered: true,
//        resize : true,
//        //sectionsColor : ['#ccc', '#fff'],
//        paddingTop: '3em',
//        paddingBottom: '10px',
//        fixedElements: '#header, .footer',
//        responsive: 0,
//
//        //Custom selectors
//        sectionSelector: '.section',
//        slideSelector: '.slide',
//
//        //events
//        onLeave: function(index, nextIndex, direction){},
//        afterLoad: function(anchorLink, index){},
//        afterRender: function(){},
//        afterResize: function(){},
//        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
//        onSlideLeave: function(anchorLink, index, slideIndex, direction){}
//    });
//});