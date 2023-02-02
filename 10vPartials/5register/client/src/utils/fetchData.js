import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`,)
    return res;
}
/*
            const method = "POST"
            const url = `api/login`;
            const body = JSON.stringify(data)
            const headers = { "Content-Type": "application/json" }
            const response = await fetch(url, { method, body, headers });
            const datas = await response.json();
*/
export const postDataAPI = async (url, data , token = "") => {
    const method = "POST"
    const baseUrl = `api/${url}`;
    const headers = { "Content-Type": "application/json", "Authorization": token }

    if (typeof data === 'object') {
        const body = JSON.stringify({ ...data })
        const response = await fetch(baseUrl, { method, body, headers });
        const datas = await response.json();
        return datas;
    } else {
        const response = await fetch(baseUrl, { method, headers });
        const datas = await response.json();
        return datas;
    }
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}