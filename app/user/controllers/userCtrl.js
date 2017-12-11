angular
.module("AuthApp")
.controller("userCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
    $scope.dog = []
    // $scope.savedDogs = []
    $scope.shelter = []
    let dogData = []
    $scope.savedDogs = []
    //let viewDogData = []
   //Get dogs from database
    userFactory.listDogs().then(data => {
        console.log(data, "THE DATA")
        $scope.dog = data
    })
    //Get shelters to display shelter name with appropriate dog
    factory.listShelter().then(data => {
        $scope.shelter = data
    })
    //Interested Button on click will save dog to the user's database
    $scope.InterestedButton = function ($event) {
        //on click, post dog to "intersted dogs" in user database
        let theDogId = $event.target.id
        userFactory.listUsers().then(data => { 
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            userFactory.addInterestedDog(theUser, theUser.id, theDogId)
        })
    }
    // var interested = [1,2,3,4,5,6,7]
    // var notInterested = [1,2, 9, 11, 12 ]
    
    // var allDogs = [1,2,3,4,5,6,7,8,9,10,11,12]
    
    // let allInterested = interested.concat(notInterested)
    // console.log(allInterested)
    
    // //YES, but look at dog.uid
    // let dogsToDisplay = allDogs.filter(function (dog){
    //     if (allInterested.indexOf(dog) < 0) {
    //         return dog
    //     }
    // })
    // console.log(dogsToDisplay)

    //Not Interested Button on click will save dog to the user's database
    $scope.notInterestedButton = function ($event) {
        //on click, post dog to "not intersted dogs" in user database
        let theDogId = $event.target.id
        userFactory.listUsers().then(data => { 
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            userFactory.addNotInterestedDog(theUser, theUser.id, theDogId)
        })
    }

    $scope.viewSavedDogs = function () {
        $location.url('/user/viewSavedDogs')
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
        
    }
}) 