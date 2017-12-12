angular
.module("AuthApp")
.controller("viewSavedDogsCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
    let dogData = []
    $scope.savedDogs = []

    // $scope.viewSavedDogs = function () {
    //     $location.url('/user/viewSavedDogs')
        
    // }
    userFactory.listUsers().then(data => { 
        
        let theUser = data.filter(function (user) {
            return user.uid === AuthFactory.getUser().uid
        })[0]
            //get all intereted dogs in current user table
        userFactory.getInterestedDogs(theUser.id).then(dogData => {
            //get all dogs that shelters have posted 
            userFactory.printInterestedDogs().then(viewDogData => {
                //loop over all dogs
                viewDogData.forEach(function (dog){
                    //if a dog.id = a value in the dogData array
                    if (dogData.indexOf(dog.id) >= 0) {
                        $scope.savedDogs.push(dog)
                    }
                    // } else {
                        //     console.log("you have no saved dogs!")
                        // }
                    })
                })
        })
    })
}) 