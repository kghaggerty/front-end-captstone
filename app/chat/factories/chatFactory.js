//Page responsible for posting chat messages and getting the chat messages displayed into the userChat.html partial
angular
.module("AuthApp")
.factory("chatFactory", function ($http, $routeParams) {
    return Object.create(null, {
        "postChat": {
            value: function(input) {
                return $http({
                    "url": "https://frontend-e2cdb.firebaseio.com/message/.json",
                    "method": "POST",
                    "data": input
                })
            }
        },
        "listChatMessages": {
            value: function () {
                return $http({
                    method: "GET",
                    url: "https://frontend-e2cdb.firebaseio.com/message/.json"
                }).then(response => {
                    const data = response.data

                    listChatMessages = Object.keys(data).map(key => {
                        data[key].id = key
                        return data[key]
                    })

                    return listChatMessages
                })
            }
        }
    })
})