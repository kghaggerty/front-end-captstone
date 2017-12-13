angular
    .module("AuthApp")
    .controller("viewShelterDogsCtrl", function ($scope, factory, userFactory, AuthFactory, $location) {
        $scope.dogsToDisplay = []
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
    })