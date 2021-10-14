// import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

export default {
    sendEmail(id, formData) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + `/contact-form-7/v1/contact-forms/${id}/feedback`, formData )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    }
}
