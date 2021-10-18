<template>
    <section class="products">
       <div class="container">
            
            <div v-if="loading" class="text-center">
                <Loader /> 
            </div>

            <div class="row" v-else>

                <h4>Product List ( {{products.length}} ) </h4>

                <div class="product col-md-3" v-for="(product, index) in products" :key="index">

                    <div class="product__img">
                        <img :src="product.images[0].src" alt="image" />
                    </div>

                    <h4>{{product.name}}</h4>

                    <p v-html="product.price_html"></p>

                    <router-link :to="'/' + product.slug">View</router-link>

                </div>


                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li v-for="(pagi, index) in productsInfo.paginations" :key="index"
                            class="page-item">
                            <a class="page-link" href="#">{{index+1}}</a>
                        </li>
                    </ul>
                </nav>

            </div>
       </div>
    </section>
</template>

<script>
import Loader from '../../../../components/util/Loader.vue'

import WooProduct from '../../../../services/wooCommerce/products'

export default {
    data() {
       return {
          products: [],
          loading: false,
          productsInfo: {
            totalProducts: 0,
            currentPage: 1,
            perPageProcductLimit: 3,
            paginations: 0
          }
       }
    },
    components: {
        Loader
    },
    methods: {
        async getProducts() {
            this.loading = true;

            let resp = await WooProduct.listing( this.productsInfo.perPageProcductLimit, this.productsInfo.currentPage);
            console.log("resp", resp)
            this.products = resp.data;
            this.loading = false; 

        },
        async paginatorFunc() {

            let resp = await WooProduct.all();
            console.log("pagi", resp.data.length)
            
            this.productsInfo.totalProducts = resp.data.length

            let pagiLimit = (this.productsInfo.totalProducts ) / this.productsInfo.perPageProcductLimit;

            console.log(  (this.productsInfo.totalProducts ) + " ~ " + this.productsInfo.perPageProcductLimit )

            let integr = Math.floor(pagiLimit), decimal = pagiLimit - integr;

            let pagi = integr;
            console.log({integr, decimal})
            if(decimal !== 0 ) {
                pagi=integr +1 
            }  
            
            console.log({pagi} )
            this.productsInfo.paginations = pagi;
            
        }

    },
    mounted() {
        this.getProducts()
        this.paginatorFunc()
    }
}
</script>


<style scoped>
.product__img { height: 100px; border: 1px solid #dd99dd; overflow: hidden; }
.product__img img { max-height: 100%; background-size: cover; }
</style>