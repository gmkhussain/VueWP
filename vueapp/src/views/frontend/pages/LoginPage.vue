<template>
    <section class="login">
        <div class="container">
            <form>
                <div class="form-group">
                    <input 
                        type="text"
                        class="form-control"
                        v-model="username"
                        />
                </div>
                <div class="form-group">
                    <input 
                        type="text"
                        class="form-control"
                        v-model="password"
                        />
                </div>
                <div class="form-group">
                    <button class="btn">Login</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: "LoginPage",
    data() {
        return {
            loginData: {}
        }
    },
    methods: {
      postAuthFunc() {
        axios.post(`http://localhost/projects/_rnd/VueWP/wordpress/wp-json/jwt-auth/v1/token`,
        {
            username: "admin",
            password: "admin123"
         })
         .then( res=> {
             console.log( res )
         }).catch( err=> console.log( err ) )
      }  
    },
    mounted() {
        this.postAuthFunc()
    }
}
</script>