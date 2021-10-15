<template>
    <div>
        <h4>Product List</h4>
    </div>
</template>

<script>
import WooProduct from '../../../../services/wooCommerce/wooCommerce'
// import axios from 'axios'
//import { API_POSTS_URL } from "../../../../config/config";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export default {
    data() {
        return {
            pageData: "Product"
        }
    },
    methods: {
        async getProducts() {
            let resp = await WooProduct.listing();
            console.log(resp)
        }
    },
    mounted() {
        console.log("A")
        this.getProducts()

        

const CK = "ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f";
const CS = "cs_efc1cfbaf33f90dc5a95f8e59129c4d5c5471995";
// const PRODUCT_API_URL = "/wc/v3/products";


const api = new WooCommerceRestApi({
    url: "https://domain/wordpress",
    consumerKey: CK,
    consumerSecret: CS,
    version: "wc/v3"
    });
    
    // List products
    api.get("products", {
        per_page: 20, // 20 products per page
    })
    .then((response) => {
    // Successful request
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);
    console.log("Total of pages:", response.headers['x-wp-totalpages']);
    console.log("Total of items:", response.headers['x-wp-total']);
    })
    .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log("Response Status:", error.response.status);
    console.log("Response Headers:", error.response.headers);
    console.log("Response Data:", error.response.data);
    })
    .finally(() => {
    // Always executed.
    });
    }
}
</script>
