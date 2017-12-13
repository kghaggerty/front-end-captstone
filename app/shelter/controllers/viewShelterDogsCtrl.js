angular
    .module("AuthApp")
    .controller("viewShelterDogsCtrl", function ($scope, factory, userFactory, AuthFactory, $location, shelterFactory) {
        $scope.dogsToDisplay = []
        $scope.dog = {}
        //Grab all dogs
        userFactory.listDogs().then(data => {
            //Find current user authentication ID
            let uid = AuthFactory.getUser().uid
            //Loop through shelter ID array and find all that equal current UID and push it into dogsTodisplay
            data.forEach(function (shelterId) {
                if (uid === shelterId.shelteruid) {
                    $scope.dogsToDisplay.push(shelterId)
                }
            })
        })
        $scope.editDog = function ($event, displayShelterOnly) {
            let key = $event.target.id
            // console.log(key, "Dog ID")
            $scope.dog.name = displayShelterOnly.name
            $scope.dog.age = displayShelterOnly.age
            $scope.dog.size = displayShelterOnly.size
            $scope.dog.health = displayShelterOnly.health
            $scope.dog.animals = displayShelterOnly.animals
            $scope.dog.children = displayShelterOnly.children
            $scope.dog.additional = displayShelterOnly.additional
        }
    })