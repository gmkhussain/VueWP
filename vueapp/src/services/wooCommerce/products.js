import axios from "axios";

const CK = process.env.VUE_APP_WOO_CK;
const CS = process.env.VUE_APP_WOO_CS;

const PRODUCT_API_URL = "/wc/v3/products";
let productLength = 0;

export default {
    all(){
        let REQ = process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}`;
        console.log("URL", REQ )
        console.log("productLength", productLength)
        return axios.get( REQ )
    },
    listing( perPageLimit=1, pageNumber=1 ) {
        let REQ = process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}&per_page=${perPageLimit}&page=${pageNumber}`;
        console.log("URL", REQ )
        console.log("productLength", productLength)
        return axios.get( REQ )
    },
    show(_id) {
        let REQ = process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+`/${_id}/?consumer_key=${CK}&consumer_secret=${CS}`;
        console.log("URL", REQ )
        return axios.get( REQ )
    }
}


