import { CONFIG } from "../../config/config";
import axios from "axios";

const CK = process.env.VUE_APP_WOO_CK;
const CS = process.env.VUE_APP_WOO_CS;

const ADD_ITEM_API_URL = "/cocart/v2/cart/add-item";
const VIEW_CART_API_URL = "/cocart/v2/cart/items";
const REMOVE_CART_API_URL = "/cocart/v2/cart/item/";

export default {
    add( _data ){
        console.log(_data)
        // _data = JSON.stringify(_data)
        
        let REQ = process.env.VUE_APP_API_BASE_URL + ADD_ITEM_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}`;

        console.log("URL", REQ, CONFIG )

        return axios.post( REQ, _data , CONFIG )
    },

    view(){

        let REQ = process.env.VUE_APP_API_BASE_URL + VIEW_CART_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}`;

        return axios.get( REQ )
    },
    remove( _itemKey ){
        console.log( _itemKey )
        let REQ = process.env.VUE_APP_API_BASE_URL + REMOVE_CART_API_URL+_itemKey+`?consumer_key=${CK}&consumer_secret=${CS}`;

        return axios.delete( REQ, {}, CONFIG )
    }
}

