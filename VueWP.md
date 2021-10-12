# Install
- Node
- XAMPP
- WordPress

# Wordpress installation 
- Create Database with this name ```vuewp```
- Set Login info
    - Id: admin
    - Password: admin123

## Create Child Theme

```your-theme-name-child```

// Style.css
```
/*
 Theme Name:   Themeized Child
 Theme URI:    https://gmkhussain.github.io/
 Description:  A child theme of Themeized.
 Author:       GMKHussain
 Author URI:   gmkhussain.github.io
 Template:     Themeized
 Version:      1.0.0
*/

@import url("../themeized/style.css");
```




# Create VueApp

- Install Vue CLI, Run ```npm i --g @vue/cli```
- ```vue create your-app-name```

Once done installtion open app folder and run 
- ```npm run serve```


# Add Vue Router to create pages / URL
- ```npm install vue-router@next --save```

- Create ```@/router/router.js```
// router.js
```

// App.vue
```js
<template>
  <div>
      <router-link to="/">Home Static Link</router-link>
      <router-link :to="links.home">Home Dynamic Link</router-link>
      <router-link :to="links.contact">Contact Dynamic Link</router-link>
      
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
        "links": {
          "home": '/',
          "contact": '/contact'
        }
    }
  },
  components: {
    // not now
  }
}
</script>
```


// main.js
```js
import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '../views/frontend/pages/HomePage'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/contact',
        name: 'ContactPage',
        component: HomePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```








## Fetch All Post on Home Page
```npm i axios --save```

// HomePage.vue
```
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
            axios.get(`your-project.url/wp-json/wp/v2/posts`)
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
```













## Add Bootstrap
```npm install bootstrap --save```
```npm install -D sass-loader@10.0.5``` 
#### ^ SASS / SCSS Loader error














## Layout




// AppLayoutDefault.vue
```js
<template>
  <div id="body-wrapper">
    <Header />
      <main id="pageContent">
        <slot />
      </main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default{
  name: 'AppLayoutDefault',
  components: {
    Header,
    Footer
  }
}
</script>
```






// AppLayout.vue
```js
<template>
  <component :is="layout">
    <slot />
  </component>
</template>


<script>
import AppLayoutDefault from './AppLayoutDefault'
export default {
  name: "AppLayout",
  data: () => ({
    layout: AppLayoutDefault
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/views/frontend/layouts/${route.meta.layout}.vue`)
          this.layout = component?.default || AppLayoutDefault
        } catch (e) {
          this.layout = AppLayoutDefault
        }
      }
    }
  }
}
</script>
```



// App.vue
```js
<template>
<AppLayout>
  <router-view />
</AppLayout>
</template>


<script>
import AppLayout from './views/frontend/layouts/AppLayout'

export default {
  name: 'App',
  components: {
    // nothing
    AppLayout
  }
}
</script>
```














## Login

### WordPress
- Add ```JWT Authentication for WP REST API``` Plugin


- Add this code in ```.htaccesss```
```js
// ..
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
//..
```


- Add Secret Key in config.php
```js
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
// define('JWT_AUTH_SECRET_KEY', '|EE^ :/?iftqn.R<2H0UlCs9Fu~Mv*mZoH)4%~/~F4eJ2HT6?RJo=S9WcuK|R(rS')
define('JWT_AUTH_CORS_ENABLE', true);
```


## Test API in Postman
- Open Postman
- Add new Request
- Select Type ```POST```
- Hit this url: ```your-project.url/wp-json/jwt-auth/v1/token```
- Click on ```body``` tab
- click on ```form-data```
- enter key and values
  - username: admin
  - password: admin123

- Check response you will get ```token```






### VueApp
// LoginPage.vue
```js
<template>
    <section class="login">
        <div class="container">
            Login Page ( without form for now! )
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
        axios.post(`your-project.url/wp-json/jwt-auth/v1/token`,
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
```



### Login with form inputs

```js
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

        await axios.post(`http://localhost/projects/_rd/VueWP/wordpress/wp-json/jwt-auth/v1/token`,
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
```

















## Config URLs for API Endpoints

- Create ```configs/config.js```

// config.js
```js
export const SITE_BASE_URL = `http://localhost/projects/_rd/VueWP/wordpress`;
export const API_BASE_URL = `http://localhost/projects/_rd/VueWP/wordpress/wp-json`;

export const JWT_AUTH_URL = `/jwt-auth/v1/token`;
export const API_POSTS_URL = `/wp/v2/posts`;

export const CONFIG = {
  headers: {
    'Accept': 'application/json',
  },
};
```


#### Usage
```js
// ...
  axios.get(`${API_BASE_URL}${API_POSTS_URL}`)
// ...
```
- Check HomePage.vue OR LoginPage.vue


// HomePage.vue
```js
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
```












## .ENV config
```js
VUE_APP_ROOT_URL = your-project.url/
VUE_APP_API_BASE_URL = your-project.url/wordpress/wp-json
```


#### Usage
```js
axios.get(`process.env.VUE_APP_API_BASE_URL${API_POSTS_URL}`)
```