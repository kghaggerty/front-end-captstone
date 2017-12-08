angular
.module("AuthApp")
.controller("userCtrl", function (userFactory, $scope) {
    $scope.dog = []
    console.log($scope.dogs)
   //Get dogs from database
    userFactory.list().then(data => {
        $scope.dog = data
    })
})