import axios from "axios";
export const userAPI = "http://localhost:3000/";

const userInstance = axios.create({
    baseURL:userAPI
})



export default userInstance;



