import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

export default {
    listing() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    add(payload) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL , payload , CONFIG );
    },
    delete(id) {
        return axios.delete( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL + id, {}, CONFIG);
    },
    edit(payload, id) {
        return axios.patch( process.env.VUE_APP_API_BASE_URL + + API_POSTS_URL + id , payload , CONFIG);
    }
}
