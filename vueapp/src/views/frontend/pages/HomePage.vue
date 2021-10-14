<template>
    <section class="home">
        <div class="container">
            <h5>Home Page</h5>

            <div v-for="(p, index) in posts" :key="index">
                {{p.id}}
                {{p.title.rendered}}
            </div>
        
        </div>
    </section>
</template>

<script>
import fetchPost from '../../../services/post/post'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: []
        }
    },

    methods: {
        async getFetchPost() {
                try {
                    let response = await fetchPost.listing();
                    if (response.status == 200) {
                       this.posts = response.data;
                       console.log("You Logged In: ", response.data)
                    }
                }  catch (ex) { console.log(ex) }
            }
        },
    mounted(){
        this.getFetchPost()
    }
}
</script>