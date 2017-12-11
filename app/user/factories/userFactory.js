angular
.module("AuthApp")
.factory("userFactory", function ($http) {
    return Object.create(null, {
        "listDogs": {
            value: function () {
                return $http({
                    method: "GET",
                    url: "https://frontend-e2cdb.firebaseio.com/dogs/.json"
                }).then(response => {
                    const data = response.data

                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return this.cache
                })
            }
        },
        "addInterestedDog": {
            value: function (user, key, dogId) {
                if (user.interestedDogs !== undefined) {
                    user.interestedDogs.push(dogId)
                } else {
                    user.interestedDogs = [dogId]
                }
                return $http({
                    method: "PUT",
                    url: `https://frontend-e2cdb.firebaseio.com/users/${key}/.json`,
                    data: user
                })
            }
        },
        "addNotInterestedDog": {
            value: function (user, key, dogId) {
                if (user.notInterestedDogs !== undefined) {
                    user.notInterestedDogs.push(dogId)
                } else {
                    user.notInterestedDogs = [dogId]
                }
                return $http({
                    method: "PUT",
                    url: `https://frontend-e2cdb.firebaseio.com/users/${key}/.json`,
                    data: user
                })
            }
        },
        "listUsers": {
            value: function () {
                return $http({
                    method: "GET",
                    url: "https://frontend-e2cdb.firebaseio.com/users/.json"
                }).then(response => {
                    let data = response.data;

                    this.cache = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return this.cache
                })
            }
        },
        "getInterestedDogs": {
            value: function (user) {
                return $http({
                    method: "GET",
                    url: `https://frontend-e2cdb.firebaseio.com/users/${user}/interestedDogs/.json`
                }).then(response => {
                    console.log(response, "THE RESPONSE")
                    let data = response.data;

                    let interestedDogs = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return interestedDogs
                })
            }

        },
        "printInterestedDogs": {
            value: function (user) {
                return $http({
                    method: "GET",
                    url: `https://frontend-e2cdb.firebaseio.com/dogs/.json`
                }).then(response => {
                    let data = response.data;

                    let printInterestedDogs = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return printInterestedDogs
                })
            }

        }
    })
})