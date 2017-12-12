angular
    .module("AuthApp")
    .controller("chatInputCtrl", function (userFactory, factory, $scope, AuthFactory, $location, chatFactory) {
        $scope.viewChat = function () {
            $location.url('/chat/userChat')
        }

        chatFactory.listChatMessages().then(result => {
            $scope.chatMessages = result
        })
        //get post button from chat
        // let whatever = document.getElementById = ('postButton')

        // whatever.addEventListener("click", getChat = function () {
        //     chatFactory.listChatMessages().then(result => {
        //         $scope.chatMessages = result
        //     })
        // })

        $scope.input = {}
        //getting user first and last name to display for chat message input
        userFactory.listUsers().then(data => {
            let theUser = data.filter(function (user) {
                return user.uid === AuthFactory.getUser().uid
            })[0]
            $scope.chatname = theUser
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
                    "id": theUser.id
                }
                chatFactory.postChat(inputPost)
                    .then(() => {
                        chatFactory.listChatMessages()
                            .then(result => {
                                console.log("messages!!!", results)
                                $scope.chatMessages = result
                            })

                    })
            })
        }

    })