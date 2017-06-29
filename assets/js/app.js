/* ==============================================
Back to Top
=============================================== */

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $("#back-to-top").fadeIn(600);
    } else {
        $("#back-to-top").fadeOut(600);
    }
});

$('#back-to-top, .back-to-top').click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, '1000');
    return false;
});

/* ==============================================
Contact Form
=============================================== */

jQuery(document).ready(function() {

    $('#contactform').submit(function() {

        var action = $(this).attr('action');

        $("#message").slideUp(750, function() {
            $('#message').hide();

            $('#submit')
                .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                .attr('disabled', 'disabled');

            $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    comments: $('#comments').val(),
                },
                function(data) {
                    document.getElementById('message').innerHTML = data;
                    $('#message').slideDown('slow');
                    $('#contactform img.loader').fadeOut('slow', function() {
                        $(this).remove()
                    });
                    $('#submit').removeAttr('disabled');
                    if (data.match('success') != null) $('#contactform').slideUp('slow');

                }
            );

        });

        return false;

    });

    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var mapElement = document.getElementById("map");
    if (mapElement) {
        var map = new google.maps.Map(mapElement, mapOptions);
        if(!map)
        {
        	return;
        }
        
        map.setOptions({
            'scrollwheel': false
        });

        // Black and White style for Google Map
        var styles = [{
            stylers: [{
                saturation: -100
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: -8
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
        }];
        map.setOptions({
            styles: styles
        });

        // Google Map Maker 
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

});
