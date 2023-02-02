const Conversations = require('../models/conversationModel')
const Messages = require('../models/messageModel')
//post ctrl ile aynisi
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const messageCtrl = {
    createMessage: async (req, res) => {
        try {
            const { sender, recipient, text, media, } = req.body

            if (!recipient || (!text.trim() && media.length === 0)) return;
         //mesela men birden fazla mesaj atsam Menim clusterime bidene conversation duser 
         //ama mesaj iki ve ya ucdene duser 
         
            const newConversation = await Conversations.findOneAndUpdate(
                {
                    $or: [
                        { recipients: [sender, recipient] },//gonderen ve alan
                        { recipients: [recipient, sender] }//alan ve gonderen
                    ]
                },
                {
                    recipients: [sender, recipient],
                    text,
                    media,
                }, { new: true, upsert: true })

            const newMessage = new Messages({
                conversation: newConversation._id,
                sender,
                recipient,
                text,
                media
            })

            await newMessage.save()

            res.json({ msg: 'Created Successfully!', newConversation, newMessage })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getConversations: async (req, res) => {
        try {
            const features = new APIfeatures(Conversations.find({
                recipients: req.user._id
            }), req.query).paginating()

            const conversations = 
            await features.query.sort('-updatedAt')
            .populate('recipients', 'avatar username fullname')

            res.json({  conversations, result: conversations.length   })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMessages: async (req, res) => {
        try {
            const features = new APIfeatures(Messages.find({
                $or: [
                    {sender: req.user._id, recipient: req.params.id},
                    {sender: req.params.id, recipient: req.user._id}
                ]
            }), req.query).paginating()

            const messages = await features.query.sort('-createdAt')

            res.json({messages, result: messages.length })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
  
}


module.exports = messageCtrl