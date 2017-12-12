angular
.module("AuthApp")
.controller("userCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
    $scope.dog = []
    $scope.shelter = []
    let dogData = []
    $scope.savedDogs = []
   //Get dogs from database
    userFactory.listDogs().then(data => {
        // console.log(data, "THE DATA")
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
    }
}) 