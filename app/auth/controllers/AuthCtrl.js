angular.module("AuthApp")
.controller("AuthCtrl", function($scope, $location, AuthFactory, factory) {
    $scope.auth = {}

    $scope.logMeIn = function (credentials) {
        AuthFactory.authenticate(credentials).then(function (didLogin) {
            $scope.login = {}
            $scope.register = {}
            $location.url('/shelter/shelterWelcome')
        })
    }
    //Button click to register a new user and bring them to their user welcome page
    $scope.registerUser = function(registerNewUser) {
      AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
        $scope.logMeIn(registerNewUser)
        //Add Post User to Database here
        factory.postUser(registerNewUser)
        $location.url('/auth/list')
        })
    }
    //Log out button, will bring them back to the general welcome page
    $scope.logoutUser = function(){
        AuthFactory.logout()
        $location.url('/auth/welcome')
    }
    //Button to take user to register new account page
    $scope.registerNewAccount = function () {
        $location.url('/auth/registerUser')
    }
    //Button to take user to register new shelter page
    $scope.registerNewShelter = function () {
        $location.url('/auth/shelterRegister')
    }
    //Button to register new shelter and take them to their shelter welcome page
    $scope.registerShelter = function(registerNewShelterAccount) {
        AuthFactory.registerWithEmail(registerNewShelterAccount).then(function (didRegister) {
          $scope.logMeIn(registerNewShelterAccount)
          //Add Post User to Database here
          factory.postShelter(registerNewShelterAccount)
          $location.url('/shelter/shelterWelcome')
        })
    }
    $scope.clickRegister = function () {
        $location.url('/auth/register')
    }
    //Button to bring user to their log in section
    $scope.clickLogInUser = function () {
        $location.url('/auth')
    }
    $scope.clickLogInShelter = function () {
        $location.url('/auth/authShelter')
    }
    //Create new account button, which will take them to page to ask if they are a user or a shelter
    $scope.clickCreate = function () {
        $location.url('/auth/decideWhoToRegister')
    }

})