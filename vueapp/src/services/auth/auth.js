import { JWT_AUTH_URL } from "../../config/config";
import axios from 'axios';

export default {
    login() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + JWT_AUTH_URL )
    },
    logout() {
        return "Logout"
    }
}
