angular
.module("AuthApp")
.controller("userCtrl", function (userFactory, $scope) {
    $scope.dogs = []

    /**
     * Use factory to get all employees from Firebase
     */
    userFactory.list().then(data => {
        $scope.dogs = data
    })
})