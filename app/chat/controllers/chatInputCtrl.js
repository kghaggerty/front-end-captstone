angular
    .module("AuthApp")
    .controller("chatInputCtrl", function (userFactory, factory, $scope, AuthFactory, $location, chatFactory, shelterFactory) {
        $scope.viewChat = function () {
            $location.url('/chat/userChat')
        }

        chatFactory.listChatMessages().then(result => {
            $scope.chatMessages = result
        })

        $scope.input = {}
        //getting user first and last name to display for chat message input
        userFactory.listUsers().then(data => {
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            $scope.chatname = theUser
            if (theUser === undefined || theUser === null)
            shelterFactory.listShelters().then(response => {
                console.log(response)
                $scope.chatname = response.shelterName
            })[0]
        })
        
        //gathering message and user information to post to firebase
        $scope.chatPostButton = function (stuff) {
            userFactory.listUsers().then(data => {
                let theUser = data.filter(function (user) {
                    return user.uid === AuthFactory.getUser().uid
                })[0]
                return theUser
            }).then(theUser => {
                const inputPost = {
                    "firstName": theUser.firstName,
                    "lastName": theUser.lastName,
                    "message": stuff.chatInput,
                    "id": theUser.id,
                }
                chatFactory.postChat(inputPost)
                    .then(() => {
                        $scope.input.chatInput = ""
                        chatFactory.listChatMessages()
                            .then(result => {
                                $scope.chatMessages = result
                            })

                    })
            })
        }

    })