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
    getPosts: async (req, res) => {
        try {
            const posts =
                await Posts.find({ user: [...req.user.following, req.user._id] })
                    .sort("-createdAt")
                    .populate("user likes", "avatar username fullname followers")
            res.json({ msg: 'Success!', result: posts.length, posts })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body
            const post = await Posts
                .findOneAndUpdate({ _id: req.params.id }, { content, images })
                .populate("user likes", "avatar username fullname")
                // .populate({ path: "comments", populate: { path: "user likes", select: "-password" } })

            res.json({ msg: "Updated Post!", newPost: { ...post._doc, content, images } })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = postCtrl