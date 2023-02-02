const Notifies = require('../models/notifyModel')
const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body
            if (recipients.includes(req.user._id.toString())) return;
            const notify = new Notifies({ id, recipients, url, text, content, image, user: req.user._id })
            await notify.save()
            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeNotify: async (req, res) => {
        try {

            //front rerefden => url olarak    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)
            //url ise   deletePost action icinde gonderilir
            // const msg = {
            //     id: post._id,
            //     text: 'deleted one post.',
            //     recipients: res.data.newPost.user.followers,
            //     url: `/post/${post._id}`,
            // }
            // dispatch(removeNotify({ msg, auth, socket }))
            const notify = await Notifies.findOneAndDelete({ id: req.params.id, url: req.query.url })

            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = notifyCtrl