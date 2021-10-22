<template>
    <section class="products">
       <div class="container">
            
            <div v-if="loading" class="text-center">
                <Loader /> 
            </div>

            <div class="row" v-else>

                <h4>Product List ( {{products.length}} ) </h4>

                <div class="product col-md-3" v-for="(product, index) in products" :key="index">

                    <div class="product__img" v-if="product.images.length !==0">
                        <img :src="product.images[0].src" alt="image" />
                    </div>

                    <h4>{{product.name}}</h4>

                    <p v-html="product.price_html"></p>

                    <router-link :to="'/products/' + product.id">View</router-link>

                    <button @click="addToCartFunc(product.id, 1)">Add to Cart</button>

                </div>

                <Pagination 
                            :totalRecords="pagination.totalRecords"
                            :currentPage="pagination.currentPage"
                            :perPage="pagination.perPage"
                            :pages="pagination.pages"
                            :pagiFunc="loadNewPage"
                            />
                            
                <nav>
                    <ul class="pagination">
                        <li v-for="(page, index) in pagination.pages" :key="index"
                            class="page-item">
                            <a class="page-link" @click="loadNewPage(index+1)" >{{index+1}}</a>
                        </li>
                    </ul>
                </nav>

            </div>
       </div>

       <div v-if="cartHasItem">
           <CartPage />
       </div>
       
    </section>
</template>

<script>
import Loader from '@/components/util/Loader.vue'
import Pagination from '@/components/util/Pagination.vue'

import CartPage from '@/views/frontend/pages/products/Cart.vue'

// Services
import WooProduct from '@/services/wooCommerce/products'
import CartService from '@/services/cart/cart'


export default {
    data() {
       return {
          products: [],
          loading: false,
          pagination: {
            totalRecords: 0,
            currentPage: 1,
            perPage: 3,
            pages: 0,
          },
         cartHasItem: false,
       }
    },
    components: {
        Loader,
        Pagination,
        CartPage
    },
    methods: {
        async getProducts() {
            try {
                this.loading = true;

                let resp = await WooProduct.listing( this.pagination.perPage, this.pagination.currentPage);
                console.log("resp", resp)
                this.products = resp.data;
                this.loading = false;
            } catch (err) {
                console.log("Err:", err)
            }

        },
        async paginatorFunc() {
            try {

            let resp = await WooProduct.all();            
                console.log("pagi", resp.data.length)

                this.pagination.totalRecords = resp.data.length
            let numberOfPages = Math.ceil( this.pagination.totalRecords / this.pagination.perPage )

                console.log(numberOfPages)
                this.pagination.pages = numberOfPages;
            } catch (err) {
                console.log("Err:", err)
            }

        },

        loadNewPage( gotoPageNum ) {
            console.log("loadNewPage()", gotoPageNum )
            this.pagination.currentPage = gotoPageNum;
            this.getProducts()
        },



        async addToCartFunc(_id, _qty){
                console.log("asd", _id)
                let itemData = { "id": _id.toString(),  "quantity": _qty.toString() };

            try {
                let resp = await CartService.add( itemData );
                console.log( resp )
                localStorage.setItem("cartHasItem", true)
                this.cartHasItem = localStorage.getItem("cartHasItem")
            } catch(err) {
                console.log("Err", err )
            }
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