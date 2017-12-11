angular
    .module("AuthApp")
    .factory("factory", function ($http) {
        return Object.create(null, {
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
            "updateUser": {
                value: function(user, key) {
                    return $http({
                        "url": `https://frontend-e2cdb.firebaseio.com/users/${key}.json`,
                        "method": "PUT",
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
            },
            "listShelter": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://frontend-e2cdb.firebaseio.com/shelter/.json"
                    }).then(response => {
                        const data = response.data
    
                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
    
                        return this.cache
                    })
                }
            }
    })
})