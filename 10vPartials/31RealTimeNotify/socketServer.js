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
    socket.on('joinUser', user => users.push({ id: user._id, socketId: socket.id, followers: user.followers }))
    //herhansi bir browseri kapatdigimizda direk disconnect olar varusersinbiri azalar
    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
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
}

module.exports = SocketServer