<template>
    <div>
        
        <section class="hero-area" id="heroArea">
            <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <template v-for="( item, index ) in heroCarousel" :key="index">
                        <button type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to="0"
                                :class=" index==0 ? 'carousel-item active' : 'carousel-item' "
                                aria-current="true"
                                aria-label="Slide 1"></button>
                    </template>
                </div>
                <div class="carousel-inner">
                    <template v-for="( item, index ) in heroCarousel" :key="index">
                        <div :class=" index==0 ? 'carousel-item active' : 'carousel-item' ">
                           <div class="row">
                               <div class="col-md-6">
                                   <h2>{{item.title.rendered}}</h2>
                                   <span v-html="item.content.rendered"></span>
                               </div>
                               <div class="col-md-6">
                                   IMG ID:  {{item.featured_media}}
                               </div>
                           </div>
                        </div> 
                    </template>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>

    </div>
</template>

<script>
import cptService from '@/services/post/custom_post_types.js'

export default {
    name: "Home_Page",
    data() {
        return {
            heroCarousel: [],
            pageData: [],
        }
    },
    methods: {
        async getHeroCarousel() {
            try {
                let resp = await cptService.all('hero_slider');
                console.log( "getHeroCarousel -> resp", resp.data )
                this.heroCarousel = resp.data;
            }
            catch (err) {
                console.log("getHeroCarousel -> Err -> ", err )
            }
        }
    },
    mounted(){
        console.log("Ready!");
        this.getHeroCarousel()
    }
}
</script>