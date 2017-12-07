angular.module("AuthApp").constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyAJ7ob3PevbEOd8V_vjKkpkz14MbGhVnlQ",
    authDomain: "frontend-e2cdb.firebaseapp.com",
    databaseURL: "https://frontend-e2cdb.firebaseio.com",
    projectId: "frontend-e2cdb",
    storageBucket: "frontend-e2cdb.appspot.com",
    messagingSenderId: "1039316831475"
  })

//   angular.module("AuthApp").run(function (FIREBASE_CONFIG) {
//     firebase.initializeApp(FIREBASE_CONFIG)
// })
angular.module("AuthApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
    
})

let isAuth = AuthFactory => new Promise ((resolve, reject) => {
    if (AuthFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})