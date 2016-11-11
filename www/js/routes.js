angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })


  .state('register', {
    url: '/register',
    templateUrl: 'templates/Register.html',
    controller: 'registerCtrl'
  })


.state('forgot_pass', {
    url: '/forgot_pass',
    templateUrl: 'templates/ForgotPassword.html',
    controller: 'fpCtrl'
  })


  .state('sidemenu', {
    url: '/sidemenu',
    templateUrl: 'templates/menu.html',
    abstract: true,
    controller: 'menuCtrl'
  })

  .state('sidemenu.home', {
    cache: false,
    url: '/home',
    views: {
        'sidemenu': {
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  }
}
  })


  .state('reportAndIncident', {
    cache: false,
    url: '/report and incident',
    templateUrl: 'templates/reportAndIncident.html',
    controller: 'reportAndIncidentCtrl'
  })


  .state('shuttleService', {
    cache: false,
    url: '/shuttleService',
    templateUrl: 'templates/shuttleService.html',
    controller: 'shuttleServiceCtrl'
  })


.state('GUKnightsService', {
    cache: false,
    url: '/GUKnightsService',
    templateUrl: 'templates/GUKnightsService.html',
    controller: 'GUKnightsServiceCtrl'
  })


  .state('MyCurrentLocation', {
    cache: false,
    url: '/MyCurrentLocation',
    templateUrl: 'templates/MyCurrentLocation.html',
    controller: 'MyCurrentLocationCtrl'
  })

  
  .state('c_tabs', {
      url: "/c_tab",
      abstract: true,
      templateUrl: "templates/c_tabs.html"
    })

  .state('c_tabs.ss_c_reports', {
      cache: false,
      url: "/ss_c_reports",
      views: {
        'ss-c_tab': {
          templateUrl: "templates/ss_c_reports.html",
          controller: 'ss_c_reportsCtrl'
        }
      }
    })

  .state('c_tabs.ks_c_reports', {
      cache: false,
      url: "/ks_c_reports",
      views: {
        'ks-c_tab': {
          templateUrl: "templates/ks_c_reports.html",
          controller: 'ks_c_reportsCtrl'
        }
      }
    })

  
  
  .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

  .state('tabs.ss_history', {
      cache: false,
      url: "/ss_history",
      views: {
        'ss-tab': {
          templateUrl: "templates/ss_history.html",
          controller: 'ss_historyCtrl'
        }
      }
    })

  .state('tabs.ks_history', {
      cache: false,
      url: "/ks_history",
      views: {
        'ks-tab': {
          templateUrl: "templates/ks_history.html",
          controller: 'ks_historyCtrl'
        }
      }
    })


  .state('HelpMe', {
    cache: false,
    url: '/HelpMe',
    templateUrl: 'templates/HelpMe.html',
    controller: 'HelpMeCtrl'
  })


$urlRouterProvider.otherwise('/')

});