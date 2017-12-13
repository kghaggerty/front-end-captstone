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
            "editShelterDog": {
                value: function (key) {
                    return $http({
                        method: "PUT",
                        url: `https://frontend-e2cdb.firebaseio.com/dogs/${key}/.json`,
                        data: user
                    })
                }
            },
        })
    })