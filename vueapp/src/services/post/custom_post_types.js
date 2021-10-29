import { CONFIG } from "../../config/config";
import axios from 'axios';

const API_CPT_URL = '/wp/v2/';

export default {
    all( _CPT_NAME ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_CPT_URL + _CPT_NAME )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    listing(perPageLimit=1, pageNumber=1) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_CPT_URL+`?per_page=${perPageLimit}&page=${pageNumber}` )
    },
    add(payload) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + API_CPT_URL , payload , CONFIG );
    },
    delete(id) {
        return axios.delete( process.env.VUE_APP_API_BASE_URL + API_CPT_URL + id, {}, CONFIG);
    },
    edit(payload, id) {
        return axios.patch( process.env.VUE_APP_API_BASE_URL + + API_CPT_URL + id , payload , CONFIG);
    }
}
