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
    getNotifies: async (req, res) => {
        try {
            const notifies =
                await Notifies
                    .find({ recipients: req.user._id })
                    .sort('-createdAt')
                    .populate('user', 'avatar username')//user objectIdsiin avatar ve usernamini getir

            /*
                biz front terefde her defe post yaradanda  createPost functioni ile Ordan notify a bunu gonderirik
                   const msg = {
                    id: res.newPost._id,
                    text: 'added a new post.',
                   
                    recipients: res.newPost.user.followers,  => meni izleyenler  =>recipients
                    url: `/post/${res.newPost._id}`,
                    content,
                    image: media[0].url
                }
        
        ve meni izleyenler recipients icine eklenilir 
        Garsi terefde eger meni izliyirse ve login edib seyfeye girirse o zaman ona notification geder 

        /Cunki    .find({ recipients: req.user._id })  bunu yuxarda ayzarag deyirikki Eger menim aydim recipient icinde varsa o postlari ve ya likelari getir 
        
        
        ve belece front terefde header(menu ) icinde notifications.length seklinde gorsenir
                */

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    isReadNotify: async (req, res) => {
        try {
            const notifies =
             await Notifies.
             findOneAndUpdate({ _id: req.params.id }, {  isRead: true })

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteAllNotifies: async (req, res) => {
        try {
            const notifies = await Notifies.deleteMany({ recipients: req.user._id })

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = notifyCtrl