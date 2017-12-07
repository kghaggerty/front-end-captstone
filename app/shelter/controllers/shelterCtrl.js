angular 
.module("AuthApp")
.controller("shelterCtrl", function ($scope, factory, shelterFactory, $timeout){
    $scope.dog = {}
    let pictureURL;
    let selectedFile; 

    $scope.postDogToDatabase = function(woof){
        shelterFactory.postDog(woof)
    }

  let whatever = document.getElementById('fileinput')
   
  let chooseFile = function () {
      console.log("WTFFF")
      console.log(this.files[0])
      selectedFile = this.files[0]
  }

   whatever.addEventListener("change", chooseFile)


  $scope.uploadFile = function () {
    firebase.storage().ref().child('dogImages/' + selectedFile.name).put(selectedFile).then(function(bobbis){
        console.log(bobbis)
    firebase.storage().ref().child('dogImages/' + selectedFile.name).getDownloadURL().then(function(url){
            //console.log(url)
            let pictureURL = url
            console.log(pictureURL)
        })
    })

  }

    // $scope.chooseFile = function (e) {
    //     var selectedFile = e.file
    //     console.log(selectedFile)
    //     debugger
    //     // var storageRef = firebase.storage().ref(file);
    //     // storageRef.put(file);
    //     // var file = selectedFile
    
    // // // 1. 'state_changed' observer, called any time the state changes
    // // // 2. Error observer, called on failure
    // // // 3. Completion observer, called on successful completion
    // uploadTask.on('state_changed', function(snapshot){
    // //     // Observe state change events such as progress, pause, and resume
    // //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //   case firebase.storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //   case firebase.storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    // }
    // }, function(error) {
    // //     // Handle unsuccessful uploads
    // }, function() {
    // //     // Handle successful uploads on complete
    // //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    // let downloadURL = uploadTask.snapshot.downloadURL;
    // console.log(downloadURL)
        
    
    // })
    // }


    // //Put image in storage databse
    // // $scope.uploadFile = function () {
    //     // Create a root reference



})