// import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

const API_PAGE_URL = '/wp/v2/pages/'

export default {
    all() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_PAGE_URL )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    single(_pageId) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_PAGE_URL + _pageId )
    },
}
