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
                        var start = q.StartAddress;
                        var end = q.DestinationAddress;
                        var distance = q.DistancedTraveled;
                        var emission = q.Emissions;
                        var tMode = q.transportationMode;
                        var user = q.Username;
                        $('#table tr:last').after("<tr><td>" + start + "</td><td>" + end + "</td><td>" + distance + "</td><td>" + emission + "</td><td>" + tMode + "</td><td>" + user + "</td></tr>");
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
                var EmissionQuery = Parse.Object.extend("emissionData");
                var query = new Parse.Query(EmissionQuery);
                query.find({
                    success: function (results) {
                        $(results).each(function (i, e) {
                            var q = e.toJSON();
                            var id = q.objectId;
                            query.get(id, {
                                success: function (myObj) {
                                    // The object was retrieved successfully.
                                    myObj.destroy({});
                                },
                                error: function (object, error) {
                                    // The object was not retrieved successfully.
                                    // error is a Parse.Error with an error code and description.
                                }
                            });
                        });
                    }
                });
            }
        });

        $('#refresh').click(function() {
           window.location = "account.html";
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
    }
)
;