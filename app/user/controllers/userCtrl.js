angular
    .module("AuthApp")
    .controller("userCtrl", function (userFactory, factory, $scope, AuthFactory, $location) {
        $scope.dog = []
        $scope.shelter = []
        let dogData = []
        $scope.savedDogs = []
        let interestedAndNot = []
        $scope.dogsToDisplay = []
        let notInterestedDogs;
        let interestedDogs;

        //Get shelters to display shelter name with appropriate dog
        factory.listShelter().then(data => {
            $scope.shelter = data
        })
        //Interested Button on click will save dog to the user's database
        $scope.InterestedButton = function ($event, dogs) {
            //on click, post dog to "intersted dogs" in user database
            let theDogId = $event.target.id
            userFactory.listUsers().then(data => {
                let theUser = data.filter(function (user) {
                    return user.uid === AuthFactory.getUser().uid
                })[0]
                userFactory.addInterestedDog(theUser, theUser.id, theDogId)
                let dogToCutOutofArray = $scope.dogsToDisplay.findIndex(dog => {
                    return dog.name === dogs.name
                })
                //console.log(dogToCutOutofArray, "CUT IT")
                $scope.dogsToDisplay.splice(dogToCutOutofArray, 1)
                console.log($scope.dogsToDisplay, "THE SPLICE")
            })
        }


        userFactory.listUsers().then(data => {
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            if (interestedDogs === null || interestedDogs === undefined) {
                console.log("get dogs")
            } else {
                theUser.interestedDogs.forEach(eachDog => {
                    interestedAndNot.push(eachDog)
                })
            }
        })

        userFactory.listUsers().then(data => {
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            if (notInterestedDogs === null || notInterestedDogs === undefined) {
                console.log("get dogs")
            } else {
                theUser.notInterestedDogs.forEach(eachOtherDog => {
                    interestedAndNot.push(eachOtherDog)
                })
            }
            //console.log(interestedAndNot, "THE FINAL ARRAY")
        })

        userFactory.listDogs().then(data => {
            //console.log(data, "DATAAA")
            let theDogsToDisplay = data.filter(function (dog) {
                let dogArray = []
                dogArray.push(dog.id)
                //console.log(dogArray)
                if (interestedAndNot.indexOf(dogArray[0]) < 0) {
                    //console.log(interestedAndNot.indexOf(dogArray) , "THE INDEx OF CONSOLE")
                    return dog
                }
            })
            $scope.dogsToDisplay = theDogsToDisplay
            console.log(theDogsToDisplay, "DOGS TO DISPLAY")
        })

        //Not Interested Button on click will save dog to the user's database
        $scope.notInterestedButton = function ($event, dogs) {
            //on click, post dog to "not intersted dogs" in user database
            let theDogId = $event.target.id
            userFactory.listUsers().then(data => {
                let theUser = data.filter(function (user) {
                    return user.uid === AuthFactory.getUser().uid
                })[0]
                userFactory.addNotInterestedDog(theUser, theUser.id, theDogId)
                let dogToCutOutofArray = $scope.dogsToDisplay.findIndex(dog => {
                    return dog.name === dogs.name
                })
                //console.log(dogToCutOutofArray, "CUT IT")
                $scope.dogsToDisplay.splice(dogToCutOutofArray, 1)
                console.log($scope.dogsToDisplay, "THE SPLICE")
            })
        }

        $scope.viewSavedDogs = function () {
            $location.url('/user/viewSavedDogs')
        }
    }) 