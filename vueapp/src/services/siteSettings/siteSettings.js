// import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

const API_SITE_SETTINGS_URL = '/site_settings/v1/all';
const API_SITE_LOGO_URL = '/wp/v2/media/';

export default {
    all() {
        console.log("Site Settting Services works...");
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_SITE_SETTINGS_URL )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    siteLogo( _LogoId ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_SITE_LOGO_URL + _LogoId )
    }
}
