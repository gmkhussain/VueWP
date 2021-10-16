<template>
    <div>
        <h4>Product List</h4>
    </div>
</template>

<script>
import WooProduct from '../../../../services/wooCommerce/wooCommerce'
// import axios from 'axios'
//import { API_POSTS_URL } from "../../../../config/config";
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

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
        
        WooProduct.getProducts().then(res => {
            console.log("getProdcuts Result: ", res)
           // setProductsData({ productsAll: res.data, loading: false })
        })
    }
}
</script>
