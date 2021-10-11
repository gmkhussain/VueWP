<template>
    <section class="home">
        <div class="container">
            <h1>Home Page</h1>

            <div v-for="(p, index) in posts" :key="index">
                {{p.id}}
                {{p.title.rendered}}
            </div>
        
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL, API_POSTS_URL } from '@/config/config.js'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: []
        }
    },

    methods: {
        async getPost() {
            axios.get(`${API_BASE_URL}${API_POSTS_URL}`)
                .then( res=> {
                    console.log(res)
                    this.posts = res.data   
                })
                .catch( err=> console.log(err) )
        }
    },
    mounted(){
        this.getPost()
    }
}
</script>