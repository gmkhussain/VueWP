import axios from 'axios';

const API_MENU_URL = '/wp-api-menus/v2/menus/';

export default {
    all() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MENU_URL )
    },
    menu( _MenuId = 1 ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MENU_URL + _MenuId )
    }
}

