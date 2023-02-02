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

            //get post gelende artig sadece id gelmiyecek direk acilimi seklinde gelecek
            const posts =
                await Posts.find({ user: [...req.user.following, req.user._id] })
                    .sort("-createdAt")
                    .populate("user likes", "avatar username fullname followers")
                    .populate({
                        path: "comments",
                        populate: { path: "user likes", select: "-password"  }
                    })
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
    likePost: async (req, res) => {
        try {
            //galiba iki defe like etmemesi ucunb unu yazdik 
            //ama zaten birdefe tikliyannan sonra tekrar tikliyanda unike edir TYani mence yazmasi anlamsiz
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id })
            if (post.length > 0) return res.status(400).json({ msg: "You liked this post." })

            const like =
                await Posts
                    .findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.user._id } }, { new: true })

            if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'Liked Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like =
                await Posts
                    .findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user._id } }, { new: true })

            if (!like) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'UnLiked Post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = postCtrl