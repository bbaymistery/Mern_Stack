const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts').post(auth, postCtrl.createPost)
router.route('/posts').get(auth, postCtrl.getPosts)



module.exports = router