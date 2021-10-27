import { CONFIG } from "../../config/config";
import axios from "axios";

const CK = process.env.VUE_APP_WOO_CK;
const CS = process.env.VUE_APP_WOO_CS;

const ADD_ORDER_API_URL = "/wc/v3/orders";

export default {
    add( _data ){
        console.log(_data)
        // _data = JSON.stringify(_data)
        
        let REQ = process.env.VUE_APP_API_BASE_URL + ADD_ORDER_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}`;

        console.log("URL", REQ, CONFIG )

        return axios.post( REQ, _data , CONFIG )
    }
}

