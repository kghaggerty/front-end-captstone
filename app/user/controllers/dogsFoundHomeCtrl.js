angular
.module("AuthApp")
.controller("dogsFoundHomeCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {

    displayArray = []
        userFactory.listDogs().then(data => {
            console.log(data)
                data.forEach(eachDog => {
                    console.log(eachDog, "EACH DOG")
                    if (eachDog.home === true) {
                        displayArray.push(eachDog)
                    $scope.dogsToDisplay = displayArray
                    } else {
                        console.log("Currently no dogs")
                    }
            })
        })
}) 