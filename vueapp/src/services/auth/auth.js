import { JWT_AUTH_URL } from "../../config/config";
import axios from 'axios';

export default {
    login( payload ) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + JWT_AUTH_URL, payload )
    },
    logout() {
        return "Logout"
    }
}
