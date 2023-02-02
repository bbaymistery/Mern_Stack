const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts').post(auth, postCtrl.createPost)
router.route('/posts').get(auth, postCtrl.getPosts)


router.route('/post/:id').patch(auth, postCtrl.updatePost)
// .get(auth, postCtrl.getPost)
// .delete(auth, postCtrl.deletePost)


module.exports = router