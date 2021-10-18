<template>
    <div>
        <h4>Product List</h4>
        <div class="row">
            <div class="product col-md-3" v-for="(product, index) in products" :key="index">

                <div class="product__img">
                    <img :src="product.images[0].src" alt="image" />
                </div>

                <h4>{{product.name}}</h4>

                <p v-html="product.price_html"></p>

                <router-link :to="'/' + product.slug">View</router-link>

            </div>
        </div>
    </div>
</template>

<script>
import WooProduct from '../../../../services/wooCommerce/products'

export default {
    data() {
       return {
          products: [{
              id: 4
          }]
       }
    },
    methods: {
        async getProducts() {
            let resp = await WooProduct.listing();
            console.log(resp)
            this.products = resp.data;
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>


<style scoped>
.product__img { height: 100px; border: 1px solid #dd99dd; overflow: hidden; }
.product__img img { max-height: 100%; background-size: cover; }
</style>