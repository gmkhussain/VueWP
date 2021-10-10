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

