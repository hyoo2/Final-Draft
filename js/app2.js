"use strict";

Parse.initialize("D09HDt6HuQzXIeXzkPi5rTLfQ8KMPUBwrORQlbBo", "pmEX9dbQy1YmCb9nw7ekEOko2eSntIMbvr3LgZqV");
var currentUser;

$(document).ready(function () {
    currentUser = Parse.User.current();
    $('#uName').text(currentUser.attributes.username);
    getEmissionData();

    function getEmissionData() {
        var Emission = Parse.Object.extend("emissionData");
        var query = new Parse.Query(Emission);
        query.find({
            success: function (results) {
                $(results).each(function (i, e) {
                    var q = e.toJSON();
                    var start =  q.StartAddress;
                    var end = q.DestinationAddress;
                    var distance = q.DistancedTraveled;
                    var emission = q.Emissions;
                    var user = q.Username;
                    $('#table tr:last').after("<tr><td>" + start + "</td><td>" + end + "</td><td>" + distance + "</td><td>" + emission + "</td></tr>");
                })
            },
            error: function (error) {
                console.log(error.message);
            }
        })
    }

    $('#logout').click(function () {
        Parse.User.logOut();
        window.location = "index.html";
    });

    $('#EmissionData').click(function () {
        $('#account').hide();
        $('#emission').show();
    });

    $('#settings').click(function () {
        $('#account').show();
        $('#emission').hide();
        $('#username').text(currentUser.attributes.username);
        $('#email').text(currentUser.attributes.email);
    });

    $('#reset').click(function () {
        if (window.confirm('Are you sure you want to reset your emission data?')) {
            //Reset Emission Data from Parse.com
  /*          var EmissionQuery = Parse.Object.extend("emissionData");
            var query = new Parse.Query(EmissionQuery);
            query.find({

            });
            Parse.Object.destroyAll([objectID, DestinationAddress, DistancedTraveled, Emissions, StartAddress, CreateAt, UpdatedAt, ACL, Username]).then(function(success) {
                // All the objects were deleted


            });*/
        }
    });

    $("#rePassword").click(function () {
        $('#resetPassword').show();
        $('#rePassword').hide();
    });

    $("#reEmail").click(function () {
        $('#resetEmail').show();
        $('#reEmail').hide();
    });

    $('#resetPasswordButton').click(function () {
        Parse.User.requestPasswordReset($('#Email4Password').val(), {
            success: function () {
                //Need to show username on nav bar
                alert('An email has been sent!')
            },
            error: function (error) {
                alert('Incorrect Password')
            }
        });
    });

    $('#')
});