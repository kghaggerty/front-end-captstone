angular
    .module("AuthApp")
    .controller("viewAllSheltersCtrl", function (userFactory, factory, $scope, AuthFactory, $location, shelterFactory) {
        $scope.shelterDisplay = []

        $scope.viewAllShelters = function () {
            $location.url('/user/viewAllShelters')
        }

        shelterFactory.listShelters().then(response => {
            console.log(response)
            $scope.shelterDisplay = response
            
            
        })
    })