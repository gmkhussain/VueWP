<template>
    <section class="login">
        <div class="container">
            <form @submit="postAuthFunc">
                <div class="form-group">
                    <input 
                        type="text"
                        class="form-control"
                        v-model="loginData.username"
                        />
                </div>
                <div class="form-group">
                    <input 
                        type="text"
                        class="form-control"
                        v-model="loginData.password"
                        />
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Login</button>
                </div>
                <span v-if="loginFeedback">{{loginFeedback}}</span>
            </form>

            <button @click="logoutFunc">Logout</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL, JWT_AUTH_URL } from '../../../config/config.js'

export default {
    name: "LoginPage",
    data() {
        return {
            loginData: {
                username: 'admin',
                password: 'admin123'
            },
            loggedIn: false,
            loginFeedback: ''
        }
    },
    methods: {
      logoutFunc() {
        localStorage.removeItem("token")
        console.log("Logout..."+ localStorage.getItem("token"))
        this.loggedIn = false
      },
      async postAuthFunc(e) {
           e.preventDefault()

        await axios.post(`${API_BASE_URL}${JWT_AUTH_URL}`,
        {
            username: this.loginData.username,
            password: this.loginData.password
         }
        ).then( res=> {
            console.log( "res", res );
            localStorage.setItem("token", res.data.token)
            this.loggedIn = true;
            this.loginFeedback = ''
            console.log( localStorage.getItem("token") )

        }).catch( err=> {
            console.log( "err", err );
            localStorage.setItem("token", '---NO---')
            console.log( localStorage.getItem("token") )
            this.loginFeedback = "Incorrect username or password, please try again"
        } )
      }
    } 
}
</script>