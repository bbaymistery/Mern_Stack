import axios from "axios";
import { getCookie } from "./helpers/cokieesFunc";


const BASE_URL = 'http://localhost:4000/api/v1'
// const TOKEN = getCookie("authToken") ? `${getCookie("authToken")}` : ""


export const publicRequest = axios.create({
    baseURL: BASE_URL
})

