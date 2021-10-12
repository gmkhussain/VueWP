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
import axios from 'axios'
import { API_POSTS_URL } from '@/config/config.js'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: []
        }
    },

    methods: {
      async getPost() {
        axios.get(`process.env.VUE_APP_API_BASE_URL${API_POSTS_URL}`)
          .then( res=> {
            console.log(res)
              this.posts = res.data   
            })
          .catch( err=> console.log(err) )
        }
    },
    mounted(){
        this.getPost()
        console.log("env", process.env )
    }
}
</script>