import axios from 'axios';

const API_MEDIA_URL = '/wp/v2/media/';

export default {
    all() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL)
    },
    single( _imageId ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL + _imageId )
    },
    singleUrl( _imageId ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL + _imageId )
    }
}
