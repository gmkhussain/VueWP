<template>
    <section class="posts">
        <div class="container">
            <h5>Posts Page</h5>

            {{errorFeedback}}
    
            <div v-for="(p, index) in posts" :key="index">
                {{p.id}}
                {{p.title.rendered}}
            </div>
        
            <Pagination 
                :totalRecords="pagination.totalRecords"
                :currentPage="pagination.currentPage"
                :perPage="pagination.perPage"
                :pages="pagination.pages"
                :pagiFunc="loadNewPage"
                />

        </div>
    </section>
</template>

<script>
import Pagination from '@/components/util/Pagination.vue'

import fetchPost from '@/services/post/post'

export default {
    name: "Post_Listing_Page",
    components: {
        Pagination
    },
    data() {
        return {
            posts: [],
            pagination: {
                totalRecords: 0,
                currentPage: 1,
                perPage: 3,
                pages: 0
            },
            errorFeedback: null
        }
    },

    methods: {
        async getFetchPost() {
                try {
                    let response = await fetchPost.listing( this.pagination.perPage, this.pagination.currentPage);
                    if (response.status == 200) {
                       this.posts = response.data;
                       console.log("You Logged In: ", response.data)
                    }
                }  catch (ex) {
                    console.log(ex)
                    this.errorFeedback = ex
                }
        },
        
        async paginatorFunc() {

            let resp = await fetchPost.all();            
                console.log("pagi", resp.data.length)

                this.pagination.totalRecords = resp.data.length
            let numberOfPages = Math.ceil( this.pagination.totalRecords / this.pagination.perPage )

                console.log(numberOfPages)
                this.pagination.pages = numberOfPages;
        },

        loadNewPage( gotoPageNum ) {
            console.log("loadNewPage()", gotoPageNum )
            this.pagination.currentPage = gotoPageNum;
            this.getFetchPost()
        }


    },
    mounted(){
        this.getFetchPost()
        this.paginatorFunc()
    }
}
</script>