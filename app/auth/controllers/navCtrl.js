angular.module("AuthApp").controller("navCtrl",
    function ($scope, $location, AuthFactory, factory, userFactory) {
        $scope.isAuthenticated = () => AuthFactory.isAuthenticated();
        $scope.logout = () => AuthFactory.logout();
        $scope.home = function () {
            userFactory.listUsers().then(data => {
                let theUser = data.filter(function (user) {
                    return user.uid === AuthFactory.getUser().uid
                })[0]
                if (theUser === undefined || theUser.firstName === null) {
                    console.log("You are a shelter")
                    $location.url('/shelter/shelterWelcome')
                } else {
                    $location.url('/user/userWelcome')
                }
            })
        }
    })
