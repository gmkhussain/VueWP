<template>
    <div>
        <h1>Home Page</h1>
        
        <div v-for="(p, index) in posts" :key="index">
            {{p.id}}
            {{p.title.rendered}}
        </div>
    
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: []
        }
    },
    methods: {
        async getPost() {
            axios.get(`http://localhost/projects/_rnd/VueWP/wordpress/wp-json/wp/v2/posts`)
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