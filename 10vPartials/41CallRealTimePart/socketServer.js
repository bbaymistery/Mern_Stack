let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item =>
        item.id === id ? { ...item, call } : item
    )
    return newData;
}

const SocketServer = (socket) => {

    //? connect || disconnect
    //basga browserde fergli usernen girsek Gorerikki users icinde ikidene user var
    socket.on('joinUser', user => {
        users.push({ id: user._id, socketId: socket.id, followers: user.followers })
    })

    //herhansi bir browseri kapatdigimizda direk disconnect olar ve rusersinbiri azalar
    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        if (data) {
            // https://www.youtube.com/watch?v=KQ_xDW9z_dQ&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=43   ddk 37.
            const clients = users.filter(user =>
                data.followers.find(item => item._id === user.id)
            )

            if (clients.length > 0) {
                clients.forEach(client => {
                    //herhansi bir user girib sonra closebrowser edende bi data.id   client terefe geder
                    socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                })
            }

        }
        users = users.filter(user => user.socketId !== socket.id)
    })


    //?Likes
    //like edilende direk like edilen post bura duser
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => socket.to(`${client.socketId}`).emit('likeToClient', newPost))
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => socket.to(`${client.socketId}`).emit('unLikeToClient', newPost))
        }
    })

    //?Comments
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => socket.to(`${client.socketId}`).emit('createCommentToClient', newPost))
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost))
        }
    })


    //?Follow
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    //1.dispatch(createPost({ content, images, auth, socket }))
    //2. dispatch(createNotify({ msg, auth, socket }))
    //3. createNotifIcinde
    //3.1 => socket.emit('createNotify', { ...res.notify, user: { username: auth.user.username, avatar: auth.user.avatar } })
    //4. socket.on('createNotify', msg => {backend}
    //5.  socket.on('createNotifyToClient', msg => {client}
    //6.inside createNotifyToClient=> CREATE_NOTIFY reducer
    //?Notification
    socket.on('createNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => socket.to(`${client.socketId}`).emit('createNotifyToClient', msg))
        }
    })


    socket.on('removeNotify', msg => {

        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)

    })

    //?Message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })

    //?Check User Online / Offline
    socket.on('checkUserOnline', data => {
        // console.log(data );=>bu data eslinde userdir hansiki SocketClientde auth user seklinde yazmisiq


        const following = users.filter(user => data.following.find(item => item._id === user.id))
        //burda foreach etmirik
        socket.emit('checkUserOnlineToMe', following)

        const clients = users.filter(user => data.followers.find(item => item._id === user.id))

        if (clients.length > 0) {
            //burda foreach edirik
            clients.forEach(client => { socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id) })
        }


    })

    //?Call User
    socket.on('callUser', data => {
        //her call e tiklatdigimizda (data geler)
        // console.log({oldUsers:users});

        //rightSide Componentden (socket.emit('callUser', msg))
        users = EditData(users, data.sender, data.recipient)
        //users=>https://www.youtube.com/watch?v=Mzn0WhMtj2Q&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=43 10.20  deki sujete bax

        const client = users.find(user => user.id === data.recipient)

        if (client) {
            if (client.call) {//editData ile call ekledik
                socket.emit('userBusy', data)
                users = EditData(users, data.sender, null)
            } else {
                users = EditData(users, data.recipient, data.sender)
                socket.to(`${client.socketId}`).emit('callUserToClient', data)
            }
        }
        // console.log({ newUsers: users });

    })

    socket.on('endCall', data => {
        // console.log(data)  //https://www.youtube.com/watch?v=Mzn0WhMtj2Q&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=43 20.22
        const client = users.find(user => user.id === data.sender)
        // console.log({oldUsers:users});

        if (client) {
            socket.to(`${client.socketId}`).emit('endCallToClient', data)
            users = EditData(users, client.id, null)

            if (client.call) {
                const clientCall = users.find(user => user.id === client.call)
                clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)

                users = EditData(users, client.call, null)
                // console.log({ newUsers: users }); //22.59 
                //https://www.youtube.com/watch?v=Mzn0WhMtj2Q&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=43
            }

        }
    })
}

module.exports = SocketServer
