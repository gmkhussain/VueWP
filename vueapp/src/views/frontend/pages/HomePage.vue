<template>
    <section class="home">
        <div class="container">
            <h5>Home Page</h5>

            <div v-if="errorFeedback">
                {{errorFeedback}}
            </div>
            <div v-else>
                <div v-for="(p, index) in posts" :key="index">
                    {{p.id}}
                    {{p.title.rendered}}
                </div>
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
    name: "Home_Page",
    components: {
        Pagination
    },
    data() {
        return {
            posts: [],
<<<<<<< HEAD
            pagination: {
                totalRecords: 0,
                currentPage: 1,
                perPage: 3,
                pages: 0
            }
=======
            errorFeedback: null
>>>>>>> 2-Fetch-Posts
        }
    },

    methods: {
<<<<<<< HEAD
        async getFetchPost() {
                try {
                    let response = await fetchPost.listing( this.pagination.perPage, this.pagination.currentPage);
                    if (response.status == 200) {
                       this.posts = response.data;
                       console.log("You Logged In: ", response.data)
                    }
                }  catch (ex) { console.log(ex) }
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
=======
        async getPost() {
            axios.get(`//localhost/projects/_rd/VueWP/wordpress/wp-json/wp/v2/posts`)
                .then( res=> {
                    console.log(res)
                    this.posts = res.data   
                })
                .catch( err=> { 
                    console.log(err)
                    this.errorFeedback = err
                } )
>>>>>>> 2-Fetch-Posts
        }


    },
    mounted(){
        this.getFetchPost()
        this.paginatorFunc()
    }
}
</script>