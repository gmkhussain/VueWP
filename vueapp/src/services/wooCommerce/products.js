import axios from "axios";

const CK = "ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f";
const CS = "cs_efc1cfbaf33f90dc5a95f8e59129c4d5c5471995";

const PRODUCT_API_URL = "/wc/v3/products";


export default {
    listing() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}` )
    }
}


