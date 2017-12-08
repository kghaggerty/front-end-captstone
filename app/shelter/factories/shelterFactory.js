angular
    .module("AuthApp")
    .factory("shelterFactory", function ($http, $routeParams) {
        return Object.create(null, {
            "postDog": {
                value: function(dog) {
                    return $http({
                        "url": "https://frontend-e2cdb.firebaseio.com/dogs/.json",
                        "method": "POST",
                        "data": dog
                    })
                }
            },
        })
    })