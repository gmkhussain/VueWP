<template>
    <div>
        <h1>Home Page</h1>
        
        <div v-if="errorFeedback">
            {{errorFeedback}}
        </div>
        <div v-else>
            <div v-for="(p, index) in posts" :key="index">
                {{p.id}}
                {{p.title.rendered}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: [],
            errorFeedback: null
        }
    },

    methods: {
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
        }
    },
    mounted(){
        this.getPost()
    }
}
</script>