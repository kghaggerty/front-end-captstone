angular 
.module("AuthApp")
.controller("shelterCtrl", function ($scope, factory, shelterFactory, $timeout, $routeParams){
    let selectedFile; 
    let pictureURL;
    let key; 
    $scope.dog = {}
    //Posts dog input to firebase
    $scope.postDogToDatabase = function(woof){
        shelterFactory.postDog(woof).then( res => {
            console.log(res)
            let key = res.data.name
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
        console.log(bobbis)
    firebase.storage().ref().child('dogImages/' + selectedFile.name).getDownloadURL().then(function(url){
            //console.log(url)
            let pictureURL = url
            $scope.dog.url = pictureURL
            })
        })
    }
})