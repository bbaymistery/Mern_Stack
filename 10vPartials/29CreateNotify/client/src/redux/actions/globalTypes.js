export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    SOCKET: 'SOCKET',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    CALL: 'CALL',
    PEER: 'PEER'
}

export const EditData = (data, id, post) => data.map(item => (item._id === id ? post : item));


export const DeleteData = (data, id) => data.filter(item => item._id !== id);
