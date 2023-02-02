const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts').post(auth, postCtrl.createPost)

router.route('/posts').get(auth, postCtrl.getPosts)

router.route('/post/:id').patch(auth, postCtrl.updatePost)

router.patch('/post/:id/like', auth, postCtrl.likePost)

router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

router.get('/user_posts/:id', auth, postCtrl.getUserPosts)

router.route('/post/:id').get(auth, postCtrl.getPost)

router.get('/post_discover', auth, postCtrl.getPostsDicover)

router.route('/post/:id').delete(auth, postCtrl.deletePost)

router.patch('/savePost/:id', auth, postCtrl.savePost)

router.patch('/unSavePost/:id', auth, postCtrl.unSavePost)

router.get('/getSavePosts', auth, postCtrl.getSavePosts)
module.exports = router