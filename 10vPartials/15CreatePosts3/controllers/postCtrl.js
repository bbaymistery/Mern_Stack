const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')



const postCtrl = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body
            if (images.length === 0) return res.status(400).json({ msg: "Please add your photo." })
            //burda moingo db ye gonderende req.user.id seklinde gonderik
            const newPost = new Posts({ content, images, user: req.user._id })
            await newPost.save()
            //burda fronta gonderende req.user seklinde gonderik
            res.json({ msg: 'Created Post!', newPost: { ...newPost._doc, user: req.user } })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = postCtrl