<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="product__img col-md-6">

                    <div id="productImages" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <template v-for="(image, index) in productInfo.images" :key="index">
                                <button type="button" data-bs-target="#productImages"
                                        
                                        :data-bs-slide-to="index"
                                        class="active"
                                        aria-current="true"
                                        aria-label="Slide 1"></button>
                            </template>
                        </div>
                        <div class="carousel-inner">

                             <template v-for="(image, index) in productInfo.images" :key="index">
                                <div :class="index===0 ? 'carousel-item active' : 'carousel-item'">
                                
                                    <img :src="image.src" class="d-block w-100" />
                                </div>
                            </template>
                            
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#productImages" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#productImages" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div class="images">
                       
                    </div>
                </div>
                <div class="product__cont col-md-6">
                    <h4>{{productInfo.name}}</h4>
                    <div class="cont">
                        <p>Id: {{productInfo.id}} </p>
                        
                        <p v-html="productInfo.price_html"></p>
                        <p>Regular Price: {{productInfo.regular_price}}</p>
                        <p>Sales Price: {{productInfo.sale_price}}</p>
                        <p>Stock: {{productInfo.stock_status}}</p>

                        <div>
                            <strong>Categories:</strong>
                            <span class="badge bg-secondary" v-for="(cata, index) in productInfo.categories" :key="index">
                                <router-link :to="'categories/'+cata.id">{{cata.name}}</router-link>
                            </span>
                        </div>


                        <div>
                            <strong>Tags:</strong>
                            <span class="badge bg-secondary" v-for="(tag, index) in productInfo.tags" :key="index">
                                <router-link :to="'tags/'+tag.id">{{tag.name}}</router-link>
                            </span>
                        </div>


                    </div>
                </div>
            </div>
        </div>    

    </section>
</template>

<script>
import wooServices from '../../../../services/wooCommerce/products'

export default {
    name: "Product_Single",
    data() {
        return {
            productInfo: {
                id: this.$route.params.id
            }
        }
    },
    methods: {
        async getProduct() {
            let resp = await wooServices.show( this.productInfo.id );
            console.log( "resp: ", resp )
            this.productInfo = resp.data;
        }
    },
    mounted() {
        this.getProduct()
    }
}
</script>


<style scoped>
#productImages .carousel-item {
    height: 200px; 
    overflow: hidden;
}
</style>