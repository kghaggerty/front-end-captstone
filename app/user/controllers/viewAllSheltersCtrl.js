angular
    .module("AuthApp")
    .controller("viewAllSheltersCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
        $scope.viewAllShelters = function () {
            $location.url('/user/viewAllShelters')
        }
    })