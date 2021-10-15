<template>
    <div>
        <h4>Product List</h4>
    </div>
</template>

<script>
import WooProduct from '../../../../services/wooCommerce/wooCommerce'

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
        this.getProducts()
    }
}
</script>
