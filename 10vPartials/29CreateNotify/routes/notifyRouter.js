const router = require('express').Router()
const auth = require('../middleware/auth')
const notifyCtrl = require('../controllers/notifyCtrl')

router.post('/notify', auth, notifyCtrl.createNotify)
router.delete('/notify/:id', auth, notifyCtrl.removeNotify)

module.exports = router