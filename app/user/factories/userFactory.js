angular
.module("AuthApp")
.factory("userFactory", function ($http) {
    return Object.create(null, {
        "list": {
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

    })
})