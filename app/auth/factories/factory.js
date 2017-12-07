angular
    .module("AuthApp")
    .factory("factory", function ($http) {
        return Object.create(null, {
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://frontend-e2cdb.firebaseio.com/employeeData/.json"
                    }).then(response => {
                        const data = response.data
                        console.log(data)

                        // Make an array of objects so we can use filters
                        return Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
                    })
                }
            },
            //Add "AddUser" post method here.  Will be called in AuthCtrl
            "postUser": {
                value: function(user) {
                    return $http({
                        "url": "https://frontend-e2cdb.firebaseio.com/users/.json",
                        "method": "POST",
                        "data": user
                    })
                }
            },
             //Add "postShelter" post method here.  Will be called in AuthCtrl
            "postShelter": {
                value: function(user) {
                    return $http({
                        "url": "https://frontend-e2cdb.firebaseio.com/shelter/.json",
                        "method": "POST",
                        "data": user
                    })
                }
            }
    })
})