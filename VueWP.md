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
