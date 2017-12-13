const app = angular.module("AuthApp", ["ngRoute"])

angular.module("AuthApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider.
        //Displays shelter welcome page
        when('/shelter/shelterWelcome', {
            templateUrl: 'app/shelter/partials/shelterWelcome.html',
            controller: 'shelterCtrl',
            resolve: { isAuth }
        })
        //Welcome/login page
        .when('/auth/welcome', {
            templateUrl: 'app/auth/partials/welcome.html',
            controller: 'AuthCtrl',
        })
        //Registers new user once they log in
        .when('/auth/register', {
            templateUrl: 'app/auth/partials/register.html',
            controller: 'AuthCtrl'
        })
        //Authorizes new user once they login
        .when('/auth', {
            templateUrl: 'app/auth/partials/auth.html',
            controller: 'AuthCtrl'
        })
        //Registers new shelter account
        .when('/auth/shelterRegister', {
            templateUrl: 'app/auth/partials/shelterRegister.html',
            controller: 'AuthCtrl'
        })
        //Takes shelter to login page
        .when('/auth/authShelter', {
            templateUrl: 'app/auth/partials/authShelter.html',
            controller: 'AuthCtrl'
        })
        //Takes user to registration page where they select shelter or user registration
        .when('/auth/decideWhoToRegister', {
            templateUrl: 'app/auth/partials/decideWhoToRegister.html',
            controller: 'AuthCtrl'
        })
        .when('/user/userWelcome', {
            templateUrl: 'app/user/partials/userWelcome.html',
            controller: 'userCtrl',
            resolve: { isAuth }
        })
        .when('/user/viewSavedDogs', {
            templateUrl: 'app/user/partials/viewSavedDogs.html',
            controller: 'viewSavedDogsCtrl',
            resolve: { isAuth }
        })
        .when('/chat/userChat', {
            templateUrl: 'app/chat/partials/userChat.html',
            controller: 'chatInputCtrl',
            resolve: { isAuth }
        })
        .when('/shelter/viewShelterDogs', {
            templateUrl: 'app/shelter/partials/viewShelterDogs.html',
            controller: 'viewShelterDogsCtrl',
            resolve: { isAuth }
        })
        // .when('/shelter/editShelterDogs', {
        //     templateUrl: 'app/shelter/partials/editShelterDog.html',
        //     controller: 'editShelterDogCtrl',
        //     resolve: { isAuth }
        // })
        //Takes user to welcome/login page
        .otherwise('/auth/welcome')
})