angular
.module("AuthApp")
.controller("viewSavedDogsCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
    let dogData = []
    $scope.savedDogs = []

    $scope.viewSavedDogs = function () {
        $location.url('/user/viewSavedDogs')
        
    }
    userFactory.listUsers().then(data => { 
        
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            //get all intereted dogs in current user table
        userFactory.getInterestedDogs(theUser.id).then(dogData => {
            console.log(theUser.id, "the user.id")
            console.log(dogData, "dog Data one")
            //get all dogs that shelters have posted 
            userFactory.printInterestedDogs().then(viewDogData => {
                console.log(viewDogData, "viewdog")
                //loop over all dogs
                viewDogData.forEach(function (dog){
                    console.log(dog, "dog for each")
                    //if a dog.id = a value in the dogData array
                    if (dogData.indexOf(dog.id) >= 0) {
                       // let dogArray = []
                        $scope.savedDogs.push(dog)
                        console.log($scope.savedDogs, "the dog array!!!!!")
                        //$scope.savedDogs = dogArray
                    }
                    // } else {
                        //     console.log("you have no saved dogs!")
                        // }
                    })
                })
                console.log($scope.savedDogs, "the dog array!!!!!")
        })
    })
}) 