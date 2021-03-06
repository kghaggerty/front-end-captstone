angular 
.module("AuthApp")
.controller("shelterCtrl", function ($scope, factory, shelterFactory, $timeout, AuthFactory, $location){
    let selectedFile; 
    let pictureURL;
    let currentId = AuthFactory.getUser().uid

    $scope.dog = {}
    shelterFactory.listShelters().then(data => {
        let theUser = data.filter(function (user) {
            return user.uid === AuthFactory.getUser().uid
        })[0]
        console.log(theUser.shelterName, "THEUSERR")
        $scope.CurrentUser = theUser.shelterName
    })
    //Posts dog input to firebase
    $scope.postDogToDatabase = function(woof){
        shelterFactory.postDog(woof).then( res => {
            $scope.dog = {}
            alert("You posted a dog!")
        })
    }
    //to get file name
    let whatever = document.getElementById('fileinput')
   
    let chooseFile = function () {
        selectedFile = this.files[0]
    }
    //add event listener when "choose file" button is clicked
    whatever.addEventListener("change", chooseFile)
    //function to upload image and store it to firebase storage.  also adding the picture url to firebase database
    $scope.uploadFile = function () {
    firebase.storage().ref().child('dogImages/' + selectedFile.name).put(selectedFile).then(function(bobbis){
    firebase.storage().ref().child('dogImages/' + selectedFile.name).getDownloadURL().then(function(url){
            let pictureURL = url
            $scope.dog.url = pictureURL
            $scope.dog.shelteruid = currentId
            $scope.dog.home = false
            shelterFactory.listShelters().then(response => {
                //console.log(response[0].email, "THE EMAIL")
                $scope.dog.email= response[0].email
            })
            })
        })
    }
    $scope.viewShelterDogsButton = function () {
        $location.url('/shelter/viewShelterDogs')
    }
})