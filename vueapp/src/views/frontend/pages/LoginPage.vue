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
                <h4 v-if="loggedIn"> Logged In! </h4>
            </form>

            <button @click="logoutFunc">Logout</button>
        </div>
    </section>
</template>

<script>
// import axios from 'axios'
// import { JWT_AUTH_URL } from '../../../config/config.js'
import postAuth from '../../../services/auth/auth'

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

           try {
                let response = await postAuth.login( {
                    username: this.loginData.username,
                    password: this.loginData.password
                } );

                if (response.status == 200) {                       
                    localStorage.setItem("token", response.data.token)
                    this.loggedIn = true;
                    this.loginFeedback = ''
                    console.log("Data Fetched: ", response.data)
                }

            }  catch (ex) { console.log(ex);  this.loginFeedback = 'Try again!' }

      }
    } 
}
</script>