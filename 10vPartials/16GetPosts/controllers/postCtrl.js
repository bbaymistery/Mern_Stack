const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')


// class APIfeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }

//     paginating() {
//         const page = this.queryString.page * 1 || 1
//         const limit = this.queryString.limit * 1 || 9
//         const skip = (page - 1) * limit
//         this.query = this.query.skip(skip).limit(limit)
//         return this;
//     }
// }

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
                    .populate("user likes", "avatar username fullname followers")
            res.json({ msg: 'Success!', result: posts.length, posts })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}
/*
const features = new APIfeatures(Posts.find({user: [...req.user.following, req.user._id]}), req.query).paginating()

const posts = await features.query.sort('-createdAt')
    .populate("user likes", "avatar username fullname followers")
    .populate({ path: "comments",populate: { path: "user likes",select: "-password" } })

*/
module.exports = postCtrl