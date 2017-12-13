angular
    .module("AuthApp")
    .controller("viewShelterDogsCtrl", function ($scope, factory, userFactory, AuthFactory, $location, shelterFactory) {
        $scope.dogsToDisplay = []
        $scope.displayShelterOnly = {}
        let currentDogId = null 

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
        $scope.editDog = function (displayShelterOnly) {
            //Get single dog factory function.  Input single key from displayshelteronly.id
            //Put that dog equal to $scope.displayShelterOnly right below
            currentDogId = displayShelterOnly.id
            shelterFactory.getSingleDog(displayShelterOnly.id).then(response => {
                console.log(response, "single dog")
                $scope.displayShelterOnly = response.data
            })
        }

        $scope.editDogToDatabase = function () {
            shelterFactory.editShelterDog(currentDogId, $scope.displayShelterOnly).then(data => {
                $scope.displayShelterOnly = {}

            })
        }
    })