angular.module("AuthApp")
.factory("AuthFactory", function ($http, $timeout, $location, $route) {
    let currentUserData = null

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            currentUserData = user
            console.log("User is authenticated")
            $route.reload()
        } else {
            currentUserData = null
            console.log("User is not authenticated")
            $timeout(function () {
                $location.url("/auth/welcome")
            }, 500);
        }
    })

    return Object.create(null, {
        isAuthenticated: {
            value: () => {
                const user = currentUserData
                return user ? true : false
            }
        },
        getUser: {
            value: () => currentUserData
            
        },
        logout: {
            value: () => firebase.auth().signOut()
        },
        authenticate: {
            value: credentials =>
                firebase.auth()
                        .signInWithEmailAndPassword(
                            credentials.email,
                            credentials.password
                        )
        },
        registerWithEmail: {
            value: user =>
                firebase.auth()
                        .createUserWithEmailAndPassword(
                            user.email,
                            user.password
                        )
        }
    })
})