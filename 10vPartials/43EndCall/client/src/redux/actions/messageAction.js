import { GLOBALTYPES, DeleteData } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'
import axios from 'axios';
export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}



export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
    /*
    const msg = {
    sender: auth.user._id,
    recipient: id,//recipient mesaji gonderdigimiz wexs
    text,
    media: newArr,
    createdAt: new Date().toISOString()
    }*/
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })

      //eger yeni bir user ekleyib mesaj yazsak Asaguidakini yaziriqki canli  gorunsun
    //dk 16.57
    //https://www.youtube.com/watch?v=KQ_xDW9z_dQ&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=41
      const { _id, avatar, fullname, username } = auth.user
    socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } })
    try {
        const res = await axios.post(`/api/message`, msg, {
            headers: { Authorization: auth.token }
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}

export const getConversations = ({ auth, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`conversations?limit=${page * 9}`, auth.token)
        // console.log(res);
        /*
        Back end terefde
        const features = new APIfeatures(Conversations.find({  recipients: req.user._id}), req.query).paginating()
        req.user.id   ile conversationalairi getiririk deye burda recipientlar icinnen bvize aid olmjyanlari elemek asan olur
        YANI KARSI TARAF DA BANA MESAJ ATMIS OLSA BENIM ID  im recipient icinde olacaginnan
        Ben conversationlari getirdigimde
        Yine bana aid olanlari getiricem
        */
        let newArr = [];
        res.data.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                // recipient icindeki mene aid deyilse onlari al yanina text falan ekle
                if (cv._id !== auth.user._id) {
                    //    console.log(cv);//mesela test adli usere gonderimisikse cv burda test adli userin _id fullname avatar ve saye sini barindirir

                    newArr.push({ ...cv, text: item.text, media: item.media,call:item.call })
                }
            })
        })

        dispatch({ type: MESS_TYPES.GET_CONVERSATIONS, payload: { newArr, result: res.data.result } })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        //id karsi tarfin id si   Auth ben
        /*
        ve back terefde menim id ile karsi tarafi birlesidirb
        Bize aid olan msjlari getirem
         const features = new APIfeatures(Messages.find({
                $or: [
                    {sender: req.user._id, recipient: req.params.id},
                    {sender: req.params.id, recipient: req.user._id}
                ]
            }), req.query).paginating()
        */
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }//mesajlar ustden asagiya olacagi ucun reverse edirik
        //burdaki _id      >  hansi userin uzerine tikliyiriqsa o id dir
        dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
//the same logic as getMessages
//dikkatt asagida update message kullanmisiz
export const loadMoreMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }

        dispatch({ type: MESS_TYPES.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
export const deleteMessages = ({ msg, data, auth }) => async (dispatch) => {
    const newData = DeleteData(data, msg._id)
    dispatch({ type: MESS_TYPES.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
    try {
        await deleteDataAPI(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteConversation = ({ auth, id }) => async (dispatch) => {
    dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id })
    try {
        await deleteDataAPI(`conversation/${id}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}