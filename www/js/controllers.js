angular.module('app.controllers', [])

// Login Controller Code...

.controller('loginCtrl', ['$scope', '$stateParams','$state','$http','$ionicPopup','$ionicHistory','$ionicLoading',
function ($scope, $stateParams, $state, $http, $ionicPopup, $ionicHistory, $ionicLoading) {

$scope.user={};

$scope.login = function() {

  $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

        $http.get("http://gulivesafe.com/json_login.php",{ params: {"email_id": $scope.user.email, "password":$scope.user.password } })
            .success(function(data) {

                if (data.status== 'success') {

          window.localStorage.setItem('loggedin_email', $scope.user.email);
          console.log(window.localStorage.getItem("loggedin_email"));
          $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
                  $ionicLoading.hide();
                  $state.go('sidemenu.home');

                }else{
                  $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please Enter Valid Credintials',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });

                }
            })
            .error(function(data) {
                console.log(data);
            });
    }
}])


// Register Controller Code...

.controller('registerCtrl', ['$scope', '$stateParams','$http','$state','$ionicPopup', '$ionicHistory','$ionicLoading',

function ($scope, $stateParams, $http, $state, $ionicPopup, $ionicHistory,  $ionicLoading) {

$scope.goBack = function() {
      $ionicHistory.goBack();
   };

$scope.user={};

$scope.register = function() {

  $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

      $http.get("http://gulivesafe.com/register.php",{ params: {"name":$scope.user.username,"email_id": $scope.user.email, "password":$scope.user.password ,"phone":$scope.user.phone} })
            .success(function(data) {
			//console.log(data.indexOf('success') !== -1);

                if(data.status== 'success')
                {

					$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

            $ionicLoading.hide();
        			$state.go('login');

                   	var alertPopup = $ionicPopup.alert({
						title: 'Registration successfull',
						template: 'Please Login with New Credintials',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					}).then(function(res) {

    });
        }
        else
        {
            $ionicLoading.hide();
					  var alertPopup = $ionicPopup.alert({
						title: 'Registration failed!',
						template: 'This EmailId Already Registered',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					});
                }

            })
            .error(function(data) {
                console.log(data);
            });
    }
}])


// Forgot Password Controller Code...

.controller('fpCtrl', ['$scope', '$stateParams','$http','$ionicPopup', '$ionicHistory', '$ionicLoading',
function ($scope, $stateParams, $http, $ionicPopup, $ionicHistory, $ionicLoading) {

$scope.goBack = function() {
      $ionicHistory.goBack();
   };

$scope.user={};

$scope.forgot_pass = function() {

  $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

        $http.get("http://gulivesafe.com/json_forgetpass.php",{ params: {"email_id": $scope.user.email} })
            .success(function(data) {

                if (data.message== 'success') {
            $ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
						template: 'Please Check Your Email For Account Datails',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					});

						$scope.user.email='';
                }else{
            $ionicLoading.hide();
					  var alertPopup = $ionicPopup.alert({
						template: 'Invalid Email Entered',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					});

                }
            })
            .error(function(data) {
                console.log(data);
            });
    }
}])



// Home Controller Code...

.controller('homeCtrl', ['$scope','$state', '$stateParams','$ionicSideMenuDelegate','$ionicHistory', '$cordovaSms', '$ionicPopup', '$cordovaVibration','$http', '$rootScope', 'dataSharetoggle1', 'dataSharetoggle2',

function ($scope,$state, $stateParams,$ionicSideMenuDelegate,$ionicHistory, $cordovaSms, $ionicPopup, $cordovaVibration, $http, $rootScope, dataSharetoggle1, dataSharetoggle2) {

var toggle1Value,toggle2Value;

$scope.shakeEffect = function() {

  var onShake = function () {
  // Fired when a shake is detected

        $scope.sendSms();

};
var onError = function () {
  // Fired when there is an accelerometer error (optional)
};

shake.startWatch(onShake, 40 /*, onError */);

};

if (window.localStorage.getItem("toggle1Value") == 'true') {

            $scope.shakeEffect();
      }

$scope.$on('data_sharedtoggle1',function(){

              toggle1Value =  dataSharetoggle1.getData();

              console.log(toggle1Value);

              window.localStorage.setItem('toggle1Value', toggle1Value);

              if (toggle1Value) {

                console.log(toggle1Value);

                $scope.shakeEffect();
              }

              else{

                    console.log(toggle1Value);
                    shake.stopWatch();

              }
              });

if (window.localStorage.getItem("toggle2Value") == 'true') {

            $scope.onDoubleTap = function()
            {

                $scope.sendSms();

            }
      }

$scope.$on('data_sharedtoggle2',function(){

              toggle2Value =  dataSharetoggle2.getData();

              console.log(toggle2Value);

              window.localStorage.setItem('toggle2Value', toggle2Value);

              if (toggle2Value) {

                console.log(toggle2Value);

                $scope.onDoubleTap = function()
                {

                    $scope.sendSms();

                }
              }
              else{
                    console.log(toggle2Value);

                    $scope.onDoubleTap = function(){}

              }
              });

$scope.sendSms = function()
{

  $cordovaVibration.vibrate(150);

$http.get("http://gulivesafe.com/view_contact.php?email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {
              console.log(data);

            if(data.status == 'fail')
              {
               var alertPopup = $ionicPopup.alert({
            template: 'Please Fill the HelpMe Messages Form and Continue',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });
              }
              else{
              var options = {
                replaceLineBreaks: false,
                android:{
                  intent:'INTENT'
                }
              };
  $cordovaSms.send(data.contact1+','+data.contact2+','+data.contact3
        +','+data.contact4+','+data.contact5,data.message, options)
      .then(function() {
            // success! SMS was sent
$http.get("http://gulivesafe.com/update_contact.php?action=updatestatus&email_id="+data.email_id+"&message="+data.message+"&status=1")
            .success(function(data) {

              if (data.status == 'success' ) {
            var alertPopup = $ionicPopup.alert({
            template: 'HelpMe Messages Sent successfull',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });
              }

        }).error(function(data) {
         console.log(data);
            });

      }, function(error) {
        // An error occurred
      });
}
}).error(function(data) {
         console.log(data);
            });


};

$scope.logout=function(){

  //delete sessionStorage.loggedin_email;
  window.localStorage.removeItem("loggedin_email");
  window.localStorage.removeItem("session");
  $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
  $state.go('login');

};

}])



// Report An Incident Controller Code...

.controller('reportAndIncidentCtrl', ['$scope', '$stateParams', '$ionicHistory','$cordovaCamera','$cordovaCapture','$http','$ionicPopup','$ionicViewSwitcher',

function ($scope, $stateParams, $ionicHistory, $cordovaCamera, $cordovaCapture, $http, $ionicPopup, $ionicViewSwitcher) {

$scope.goBack = function() {

      $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();
   };

$scope.user={};
var base64;
                // Getting Picture Using Camera Code...
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        base64 = imageData;
                         
                        console.log(base64);

                    }, function (err) {
                      console.log(err);
                        // An error occured. Show a message to the user
                    });
                }


            // Getting Picture Through Gallery Code...
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        base64 = imageData;

                        console.log(base64);

                    }, function (err) {
                      console.log(err);
                        // An error occured. Show a message to the user
                    });
                }

            // Capture Video Using Camera Code...
                $scope.captureVideo = function() {
                var options = { limit: 3 };

              $cordovaCapture.captureVideo(options).then(function(videoData) {
              // success! Video data is here
                console.log(videoData);
                $scope.imgURI = "data:video/mp4;base64," + videoData;
               }, function(err) {
              // An error occurred. Show a message to the user
              });
               }


              // Capture Audio Using Recorder Code...
               $scope.captureAudio = function() {
                var options = { limit: 3};

              $cordovaCapture.captureAudio(options).then(function(audioData) {
              // success! Audio data is here
                console.log(audioData);
              }, function(err) {
              // An error occurred. Show a message to the user
              });
              }

             $scope.send = function()
              {       
                console.log("http://gulivesafe.com/byteEx.php?email_id="+window.localStorage.getItem("loggedin_email")+"&image_path="+base64+"&message="+$scope.user.information);
                //$http.post("http://gulivesafe.com/byteEx.php",{ params: {"email_id": window.localStorage.getItem("loggedin_email"),"image_path":base63, "message":$scope.user.information } })
                $http.post("http://gulivesafe.com/byteEx.php?email_id="+window.localStorage.getItem("loggedin_email")+"&image_path="+base64+"&message="+$scope.user.information)
                .success(function(data) {

                  console.log(data.status);
                  if(data.status== 'success')
                    {
                      console.log(data);
                      var alertPopup = $ionicPopup.alert({
                        template: 'Request successfully Sent',
                        buttons: [{
                    text:'Ok',
                    type: 'button-dark'
                  }]
              });
              }
                    else
              {
                      console.log(data);
                      var alertPopup = $ionicPopup.alert({
                      title: 'Request failed!',
                      template: 'Please try Again',
                      buttons: [{
                          text:'Ok',
                          type: 'button-dark'
                        }]
                    });
              }
              })
            .error(function(data) 
            {
                console.log(data);
            });
            }
}])


// Shuttle Service Controller Code...

.controller('shuttleServiceCtrl', ['$scope', '$stateParams','$http','$ionicPopup', '$ionicHistory','$ionicLoading', '$ionicViewSwitcher',

function ($scope, $stateParams, $http, $ionicPopup, $ionicHistory, $ionicLoading, $ionicViewSwitcher) {

$scope.goBack = function() {
      $ionicHistory.goBack();
      $ionicViewSwitcher.nextDirection('forward');
   };

$scope.user={};

$scope.locations = [
        {display: 'Admission-Graduate'},{display: 'Admissions-International'},{display: 'Admissions-Undergraduate'},{display: 'A.J.Palumbo Academic Center'},{display: 'Beyer Hall'},{display: 'Center for Communication and the Arts'},{display: 'Campus Police & Safety'},{display: 'Campus Services'},{display: 'Cashier'},{display: 'Carnival Athletic Pavilion'},{display: 'Courthouse Commons'},
        {display: 'Erie Technology Incubator (ETI)'},{display: 'Forensic Investigation Center'},{display: 'Finegan Hall'},{display: 'Gannon Field'},{display: 'Gannon Arch'},{display: 'Human Resources'},{display: 'Hammermill Center'},{display: 'Health & Counselling Services'},{display: 'Harborview Apartments'},
        {display: 'North Hall'},{display: 'Nash library'},{display: 'Registrar'},{display: 'Robert H. Morosky Academy Center'},{display: 'Recreation and Wellness Center'},{display: 'Schuster theatre/Scottino Hall'},{display: 'Student Services Building'},{display: 'The knight Club'},
        {display: 'University Bookstore'},{display: 'Waldron Campus Center'},
        {display: 'Wickford Apartments'},{display: 'Zurn Science Center'}
    ];

$scope.c_location = function (item) {

          $scope.user.c_location = item.display;
    };

$scope.d_location = function (item) {

          $scope.user.d_location = item.display;
    };


$scope.requestSh_Service = function() {

     $ionicLoading.show({
        content: 'Getting Data',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

			console.log("http://gulivesafe.com/insert.php?email_id="+window.localStorage.getItem("loggedin_email")+"&location="+$scope.user.c_location+"&dest_location="+$scope.user.d_location+"&message="+$scope.user.information+"&time="+$scope.user.time+"&action=shuttle");
      $http.get("http://gulivesafe.com/insert.php?email_id="+window.localStorage.getItem("loggedin_email")+"&location="+$scope.user.c_location+"&dest_location="+$scope.user.d_location+"&message="+$scope.user.information+"&time="+$scope.user.time+"&action=shuttle")
            .success(function(data) {

                if(data.status== 'success')
                {
                  $ionicLoading.hide();
                	var alertPopup = $ionicPopup.alert({
               		template: 'Request successfully Sent',
                  buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					});

					        $scope.user.c_location='';
                	$scope.user.d_location='';
                	$scope.user.information='';
                  $scope.user.time='';


                }else{
                  $ionicLoading.hide();
                	var alertPopup = $ionicPopup.alert({
						title: 'Request failed!',
						template: 'Please try Again',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
					});
                }

            })
            .error(function(data) {
                console.log(data);
            });
    }


}])


//Gu KnightService Controller Code...

.controller('GUKnightsServiceCtrl', ['$scope', '$stateParams','$http','$ionicPopup', '$ionicHistory', '$ionicLoading', '$ionicViewSwitcher',
function ($scope, $stateParams, $http, $ionicPopup, $ionicHistory, $ionicLoading, $ionicViewSwitcher) {

$scope.goBack = function() {
  $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();

   };

$scope.user={};

$scope.locations = [
        {display: 'Admission-Graduate'},{display: 'Admissions-International'},{display: 'Admissions-Undergraduate'},{display: 'A.J.Palumbo Academic Center'},{display: 'Beyer Hall'},{display: 'Center for Communication and the Arts'},{display: 'Campus Police & Safety'},{display: 'Campus Services'},{display: 'Cashier'},{display: 'Carnival Athletic Pavilion'},{display: 'Courthouse Commons'},
        {display: 'Erie Technology Incubator (ETI)'},{display: 'Forensic Investigation Center'},{display: 'Finegan Hall'},{display: 'Gannon Field'},{display: 'Gannon Arch'},{display: 'Human Resources'},{display: 'Hammermill Center'},{display: 'Health & Counselling Services'},{display: 'Harborview Apartments'},
        {display: 'North Hall'},{display: 'Nash library'},{display: 'Registrar'},{display: 'Robert H. Morosky Academy Center'},{display: 'Recreation and Wellness Center'},{display: 'Schuster theatre/Scottino Hall'},{display: 'Student Services Building'},{display: 'The knight Club'},
        {display: 'University Bookstore'},{display: 'Waldron Campus Center'},
        {display: 'Wickford Apartments'},{display: 'Zurn Science Center'}
    ];

$scope.c_location = function (item) {

          $scope.user.c_location = item.display;
    };

$scope.d_location = function (item) {

          $scope.user.d_location = item.display;
    };

$scope.requestKnight_Service = function() {

$ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

      console.log("http://gulivesafe.com/insert.php?email_id="+window.localStorage.getItem("loggedin_email")+"&location="+$scope.user.c_location+"&dest_location="+$scope.user.d_location+"&message="+$scope.user.information+"&time="+$scope.user.time+"&action=knight_service");
      $http.get("http://gulivesafe.com/insert.php?email_id="+window.localStorage.getItem("loggedin_email")+"&location="+$scope.user.c_location+"&dest_location="+$scope.user.d_location+"&message="+$scope.user.information+"&time="+$scope.user.time+"&action=knight_service")
            .success(function(data) {

                if(data.status== 'success')
                {
                  $ionicLoading.hide();
                	var alertPopup = $ionicPopup.alert({
                		template: 'Request successfully Sent',
                    buttons: [{
                text:'Ok',
                type: 'button-dark'
                }]
					       });
                	$scope.user.c_location='';
                	$scope.user.d_location='';
                	$scope.user.information='';
                  $scope.user.time='';
                }else{
                  $ionicLoading.hide();
                	var alertPopup = $ionicPopup.alert({
      						title: 'Request failed!',
      						template: 'Please try Again',
                  buttons: [{
                      text:'Ok',
                      type: 'button-dark'
                    }]
      					});
                }

            })
            .error(function(data) {
                console.log(data);
            });
    }
}])



//MyCurrent Location Controller Code...

.controller('MyCurrentLocationCtrl', ['$scope', '$stateParams','$ionicModal','$ionicActionSheet', '$timeout', '$http', '$log','$state', '$location', '$ionicPopup', '$compile','geolocationService','geofenceService','$ionicLoading','$ionicHistory', '$ionicViewSwitcher',

function ($scope, $stateParams, $ionicModal,$ionicActionSheet, $timeout, $http, $log,$state, $location, $ionicPopup, $compile,geolocationService,geofenceService,$ionicLoading, $ionicHistory, $ionicViewSwitcher) {

$scope.goBack = function() {
  $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();
   };

		$scope.latLang={
		lat:'',
		lang:'',
		location:''
	};

		 $ionicLoading.show({
            template: 'Getting geofences from device...',
            duration: 3000
        });

        $scope.geofences = [];

        geofenceService.getAll().then(function (geofences) {
            $ionicLoading.hide();
            $scope.geofences = geofences;
        }, function (reason) {
            $ionicLoading.hide();
            $log.log('An Error has occured', reason);
        });

            $log.log('Tracing current location...');
            $ionicLoading.show({
                template: 'Tracking current location...'
            });
            geolocationService.getCurrentPosition()
                .then(function (position) {
                    $log.log('Current location found');
                    $log.log('Current location Latitude'+position.coords.latitude);
                    $log.log('Current location Longitude'+position.coords.longitude);

                    $ionicLoading.hide();
					$scope.latLang.lat=parseFloat(position.coords.latitude);
					$scope.latLang.lang=parseFloat(position.coords.longitude);
					var lat =$scope.latLang.lat;
					var lang =$scope.latLang.lang;
					//You can hit request upto 2300 per day on free of cost.
					var mrgdata='http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lang+'&sensor=true'
					$http.get(mrgdata)
							.success(function (response) {
							/* console.log(response.results[0].formatted_address); */
							$scope.latLang.location=response.results[0].formatted_address;
							console.log("Your Current Location is : " +$scope.latLang.location)

							var myLatlng = new google.maps.LatLng(lat,lang);

						var mapOptions = {
						  center: myLatlng,
						  zoom: 16,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						var map = new google.maps.Map(document.getElementById("map"),
							mapOptions);


						 var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
						var compiled = $compile(contentString)($scope);

						var infowindow = new google.maps.InfoWindow({

						});
						infowindow.setContent($scope.latLang.location);
						infowindow.open(map, marker);

						var marker = new google.maps.Marker({
						  position: myLatlng,
						  map: map,
						  title: 'Current Location'
						});

						google.maps.event.addListener(marker, 'click', function() {
						  infowindow.open(map,marker);

						});

						$scope.map = map;


				}).error(function (data, status, headers, config) {
					console.log("error");

					 if (status == 0)
						showalert("Error", "Errro Occured from Server site!");
					else
						showalert("Error", data);

				});

		}, function (reason) {
			$log.log('Cannot obtain current location', reason);

			$ionicLoading.show({
				template: 'Cannot obtain current location',
				duration: 3100
			});
		});


	 //This is default set location before fetching current location///
	 //***************Start********************************//
	 /*if($scope.latLang.lat==''){
			var myLatlng = new google.maps.LatLng(18.16830,82.16238);

						var mapOptions = {
						  center: myLatlng,
						  zoom: 16,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						var map = new google.maps.Map(document.getElementById("map"),
							mapOptions);


						 var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
						var compiled = $compile(contentString)($scope);

						var infowindow = new google.maps.InfoWindow({

						});
						infowindow.setContent($scope.latLang.location);
						infowindow.open(map, marker);

						var marker = new google.maps.Marker({
						  position: myLatlng,
						  map: map,
						  title: 'Current Location'
						});

						google.maps.event.addListener(marker, 'click', function() {
						  infowindow.open(map,marker);

						});

						$scope.map = map;
	 }
*/
}])



// Current Reports of Shuttle Service Code...
.controller('ss_c_reportsCtrl', ['$scope', '$stateParams','$http', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$ionicViewSwitcher',
function ($scope, $stateParams, $http, $ionicHistory, $ionicLoading, $ionicPopup, $ionicViewSwitcher) {

$scope.goBack = function() {

      $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();
   };

 $ionicLoading.show({
  //template: 'Getting Data',
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$http.get("http://gulivesafe.com/current_requests(new).php?name=shuttle_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

              $ionicLoading.hide();
              $scope.shuttle_c_report = data;

angular.forEach($scope.shuttle_c_report, function(item){

$scope.CancelReq = function()
  {
  var confirmPopup = $ionicPopup.confirm({
     title: 'Request For Cancellation',
     template: 'Are you sure you want to Cancel Shuttle Service?',
     buttons: [
     { text: "No"
     },
     { text: "Yes",
     type: 'button-dark',
     onTap:function(e){

    $http.get("http://gulivesafe.com/insert.php?action=shuttle_cancel&shtle_request_id="+item.shtle_request_id+"&shuttle_id="+item.shuttle_id)
            .success(function(data) {

          console.log(data);
          if(data.status == 'success')
                {
                  console.log("data");
                  var alertPopup = $ionicPopup.alert({
                    template: 'Cancelled Your Request For Shuttle Service',
                    buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
                  });

                  alertPopup.then(function(res) {
     $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$http.get("http://gulivesafe.com/current_requests(new).php?name=shuttle_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

              $ionicLoading.hide();
              $scope.shuttle_c_report = data;

              }).error(function(data) {
                console.log(data);
            });
                });
                }


        }).error(function(data) {
         console.log(data);
            });

       }
     }]
   });
  }
  })

}).error(function(data) {
         console.log(data);
            });
}])



// Current Reports of Knight Service Code...
.controller('ks_c_reportsCtrl', ['$scope', '$stateParams','$http', '$ionicHistory', '$ionicLoading', '$ionicPopup', '$ionicViewSwitcher',
function ($scope, $stateParams, $http, $ionicHistory, $ionicLoading, $ionicPopup, $ionicViewSwitcher) {


               $ionicLoading.show({
                  content: 'Getting Data',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
                });

$http.get("http://gulivesafe.com/current_requests(new).php?name=knight_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

              $ionicLoading.hide();
              $scope.knight_c_report = data;

angular.forEach($scope.knight_c_report, function(item){

  $scope.CancelReq = function()
  {
  var confirmPopup = $ionicPopup.confirm({
     title: 'Request For Cancellation',
     template: 'Are you sure you want to Cancel Knight Service?',
        buttons: [
     { text: "No"
     },
     { text: "Yes",
     type: 'button-dark',
     onTap:function(e){

      $http.get("http://gulivesafe.com/insert.php?action=knight_cancel&gu_knights_id="+item.gu_knights_id+"&knight_id="+item.knight_id)
            .success(function(data) {
       console.log(data);
    if(data.status== 'success')
                {
        console.log("data");
                  var alertPopup = $ionicPopup.alert({
                    template: 'Cancelled Your Request For Knight Service',
                    buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });
                  alertPopup.then(function(res) {
                  $ionicLoading.show({
                  content: 'Getting Data',
                  animation: 'fade-in',
                  showBackdrop: true,
                  maxWidth: 200,
                  showDelay: 0
          });

$http.get("http://gulivesafe.com/current_requests(new).php?name=knight_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

              $ionicLoading.hide();
              $scope.knight_c_report = data;

              }).error(function(data) {
                console.log(data);
            });
                });
                }

        }).error(function(data) {
         console.log(data);
            });
       }
     }]
   });
  }
  })

}).error(function(data) {
         console.log(data);
            });
}])



//Shuttle Service History Controller Code...

.controller('ss_historyCtrl', ['$scope', '$stateParams','$http', '$ionicHistory', '$ionicLoading', '$ionicViewSwitcher',
function ($scope, $stateParams, $http, $ionicHistory, $ionicLoading, $ionicViewSwitcher) {

$scope.goBack = function() {

      $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();
   };


 $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$http.get("http://gulivesafe.com/report_history.php?name=shuttle_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

            	$ionicLoading.hide();
            	$scope.shuttle_report_history = data;

}).error(function(data) {
         console.log(data);
            });
}])


//Knight Service History Controller Code...

.controller('ks_historyCtrl', ['$scope', '$stateParams','$http', '$ionicHistory', '$ionicLoading', '$ionicViewSwitcher',
function ($scope, $stateParams, $http, $ionicHistory, $ionicLoading, $ionicViewSwitcher) {


$ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$http.get("http://gulivesafe.com/report_history.php?name=knight_service&email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {

            	$ionicLoading.hide();
            	$scope.knight_report_history = data;

}).error(function(data) {
         console.log(data);
            });

}])


//HelpMe Message Controller Code...

.controller('HelpMeCtrl', ['$scope', '$stateParams', '$ionicHistory','ContactsService','$ionicLoading', '$ionicPopup','$http', '$ionicViewSwitcher',

function ($scope, $stateParams, $ionicHistory, ContactsService, $ionicLoading, $ionicPopup, $http, $ionicViewSwitcher) {

$scope.user={};

$scope.goBack = function() {
      $ionicViewSwitcher.nextDirection('forward');
      $ionicHistory.goBack();
   };

$ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

      $http.get("http://gulivesafe.com/view_contact.php?email_id="+window.localStorage.getItem("loggedin_email"))
            .success(function(data) {
              console.log(data);

            if(data.status == 'fail')
              {

              $ionicLoading.hide();
              }

              else{
              $scope.user.contact1 = data.contact1;
              $scope.user.contact2 = data.contact2;
              $scope.user.contact3 = data.contact3;
              $scope.user.contact4 = data.contact4;
              $scope.user.contact5 = data.contact5;
              $scope.user.message = data.message;
                $ionicLoading.hide();

              }


}).error(function(data) {
         console.log(data);
            });


$scope.goBack = function() {
      $ionicHistory.goBack();
   };

        $scope.pickContact1 = function() {

            ContactsService.pickContact().then(
                function(contact) {

          $scope.user.contact1 = contact.phones[0].value;

           },
                function(failure) {
                    console.log("Failed to pick a contact");
                }
            );
        }

        $scope.pickContact2 = function() {

            ContactsService.pickContact().then(
                function(contact) {
          $scope.user.contact2 = contact.phones[0].value;
                },
                function(failure) {
                    console.log("Failed to pick a contact");
                }
            );
        }

        $scope.pickContact3 = function() {

            ContactsService.pickContact().then(
                function(contact) {
          $scope.user.contact3 = contact.phones[0].value;
                },
                function(failure) {
                    console.log("Failed to pick a contact");
                }
            );
        }

        $scope.pickContact4 = function() {

            ContactsService.pickContact().then(
                function(contact) {
          $scope.user.contact4 = contact.phones[0].value;
                },
                function(failure) {
                    console.log("Failed to pick a contact");
                }
            );
        }

        $scope.pickContact5 = function() {

            ContactsService.pickContact().then(
                function(contact) {
          $scope.user.contact5 = contact.phones[0].value;
                },
                function(failure) {
                    console.log("Failed to pick a contact");
                }
            );
        }

$scope.save = function()
  {
    $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

$http.get("http://gulivesafe.com/insert.php?action=message&email_id="+window.localStorage.getItem("loggedin_email")+"&contact1="+$scope.user.contact1+"&contact2="+$scope.user.contact2+"&contact3="+$scope.user.contact3
            +"&contact4="+$scope.user.contact4+"&contact5="+$scope.user.contact5+"&message="+$scope.user.message)
            .success(function(data) {

            if(data.status== 'success')
                {
              $ionicLoading.hide();

        var alertPopup = $ionicPopup.alert({
            template: 'Contacts Saved successfull',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });
             }
              else{
            $ionicLoading.hide();

            var alertPopup = $ionicPopup.alert({
            title: 'Request failed!',
            template: 'Please try Again',
            buttons: [{
                text:'Ok',
                type: 'button-dark'
              }]
          });
              }

}).error(function(data) {
          $ionicLoading.hide();
         console.log(data);
            });
  }

$scope.reset = function()
  {
    $ionicLoading.show({
    content: 'Getting Data',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

    $scope.user.contact1 = '';
    $scope.user.contact2 = '';
    $scope.user.contact3 = '';
    $scope.user.contact4 = '';
    $scope.user.contact5 = '';
    $scope.user.message = '';

    $ionicLoading.hide();

  }

}])


//SideMenu Controller Code...

.controller('menuCtrl', ['$scope', '$stateParams','$ionicSideMenuDelegate', 'dataSharetoggle1', 'dataSharetoggle2',
function ($scope, $stateParams,$ionicSideMenuDelegate, dataSharetoggle1, dataSharetoggle2) {


$scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

            if (window.localStorage.getItem("toggle1Value") == 'true') {
                  $scope.toggle1value = true;
                  //dataShare.sendData($scope.value);
                  console.log($scope.toggle1value);
            }
            else{
               $scope.toggle1value = false;
               console.log($scope.toggle1value);
            }

            $scope.toggle1Change = function() {
                if ($scope.toggle1value == false) {
                    $scope.toggle1value = true;
                } else{
                  $scope.toggle1value = false;
                }
                dataSharetoggle1.sendData($scope.toggle1value);
                console.log($scope.toggle1value);
              };

              if (window.localStorage.getItem("toggle2Value") == 'true') {
                  $scope.toggle2value = true;
                  //dataShare.sendData($scope.value);
                  console.log($scope.toggle2value);
            }
            else{
               $scope.toggle2value = false;
               console.log($scope.toggle2value);
            }

            $scope.toggle2Change = function() {
                if ($scope.toggle2value == false) {
                    $scope.toggle2value = true;
                } else{
                  $scope.toggle2value = false;
                }
                dataSharetoggle2.sendData($scope.toggle2value);
                console.log($scope.toggle2value);
              };
}])
