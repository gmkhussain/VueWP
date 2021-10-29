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


























### Create custom
Custom layout fetch layout base on ```route.meta.layout``` param

see above code:
```js
// ...
const component = await import(`@/views/frontend/layouts/${route.meta.layout}.vue`)
// ...
```




#### Create LoginLayout.vue
```js
<template>
  <div id="body-wrapper">
      <main id="pageContent">
        <slot />
      </main>
  </div>
</template>

<script>

export default{
  name: 'LoginLayout',
  components: {
    // Layout without Header & Footer
  }
}
</script>
```





#### Add Layout and route in router file.

// router/router.js
```js
import { createWebHistory, createRouter } from 'vue-router';
// import HomePage from '../views/frontend/pages/HomePage.vue'
import ContactPage from '../views/frontend/pages/ContactPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home_Page',
        component: () => import('@/views/frontend/pages/HomePage.vue')
    },
    {
        path: '/contact',
        name: 'Contact_Page',
        component: ContactPage
    },
    {
        path: '/login',
        name: 'Login_Page',
        component: () => import('@/views/frontend/pages/LoginPage.vue'),
        meta: { layout: 'LoginLayout' } // <-- Layout
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
```





### Create Login Page
```js
<template>
    <section class="home">
        <div class="container">
            <h4>Login Page</h4>
            <h5>Layout: LoginLayout ( without Header and Footer )</h5>
        </div>
    </section>
</template>

<script>
export default {
    name: "Login_Page"
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



































## Services for APIs

#### Create `services/services.js`
```js
export * from './post/post.js';
```

#### Create `services/posts/post.js`
```js
import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

export default {
    listing() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    add(payload) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL , payload , CONFIG );
    },
    delete(id) {
        return axios.delete( process.env.VUE_APP_API_BASE_URL + API_POSTS_URL + id, {}, CONFIG);
    },
    edit(payload, id) {
        return axios.patch( process.env.VUE_APP_API_BASE_URL + + API_POSTS_URL + id , payload , CONFIG);
    }
}
```





#### Modify HomePage.vue

```js
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
import fetchPost from '../../../services/services'

export default {
    name: "Home_Page",
    data() {
        return {
            posts: []
        }
    },

    methods: {
        async getFetchPost() {
                try {
                    let response = await fetchPost.listing();
                    if (response.status == 200) {
                       this.posts = response.data;
                       console.log("Data Fetched: ", response.data)
                    }
                }  catch (ex) { console.log(ex) }
            }
        },
    mounted(){
        this.getFetchPost()
    }
}
</script>
```


























## WooCommerece

- Install WooCommerce on WordPress site
- Add dummy product
- Goto ```Settings``` > ```Advanced``` > ```Legacy API``` > ```Enable the legacy REST API``` [SAVE]
- Goto ```Settings``` > ```Advanced``` > ```REST API``` > ```Add key``` > [Generate API Key]


- Open POSTMAN
- Add new request 
- Select ```GET``` paste ```your-project.url/VueWP/wordpress/wp-json/wc/v3/products```
- Select ```Authorization``` > Type: ```Oauth 1.0```
- Enter your ```Consumer Key``` and ```Consumer Secret```















## Fetch WooCommerce Products


- Add this line in ```.htaccess``` file ```SetEnv HTTPS on```


- Create ```services/wooCommerce/products.js```
```js
import axios from "axios";

const CK = "ck_...";
const CS = "cs_...";

const PRODUCT_API_URL = "/wc/v3/products";


export default {
    listing() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+`?consumer_key=${CK}&consumer_secret=${CS}` )
    }
}
```



- Create ```views/frontend/pages/products/ProductList/vue```

```js
<template>
    <div>
        <h4>Product List</h4>
        <div class="row">
            <div class="product col-md-3" v-for="(product, index) in products" :key="index">

                <div class="product__img">
                    <img :src="product.images[0].src" alt="image" />
                </div>

                <h4>{{product.name}}</h4>

                <p v-html="product.price_html"></p>

                <router-link :to="'/' + product.slug">View</router-link>

            </div>
        </div>
    </div>
</template>

<script>
import WooProduct from '../../../../services/wooCommerce/products'

export default {
    data() {
       return {
          products: [{
              id: 4
          }]
       }
    },
    methods: {
        async getProducts() {
            let resp = await WooProduct.listing();
            console.log(resp)
            this.products = resp.data;
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>


<style scoped>
.product__img { height: 100px; border: 1px solid #dd99dd; overflow: hidden; }
.product__img img { max-height: 100%; background-size: cover; }
</style>
```





### Loader
- Create ```components\util\Loader.vue```
```js
<template>
    <div class="loader">
        <div>Loading...</div>
    </div>
</template>

```


- Add ```Loader``` on ```ProductList.vue```

```js
//...
    <div v-if="loading" class="text-center">
        <Loader /> 
    </div>
//..

//..
export default {
    data() {
       return {
          products: [],
          loading: false
       }
    },
//...
```

















## Pagination

// ProductList.vue
```js
<template>
    <section class="products">
       <div class="container">
        // ...  ...

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li v-for="(pagi, index) in productsInfo.paginations" :key="index"
                        class="page-item">
                        <a class="page-link" @click="fetchNextPage(index+1)" >{{index+1}}</a>
                    </li>
                </ul>
            </nav>

        // ...  ...
       </div>
    </section>
</template>

<script>
import Loader from '../../../../components/util/Loader.vue'
import WooProduct from '../../../../services/wooCommerce/products'

export default {
    data() {
       return {
          products: [],
          loading: false,
          productsInfo: {
            totalProducts: 0,
            currentPage: 1,
            perPageProcductLimit: 1,
            paginations: 0 // <---
          }
       }
    },
    components: {
        Loader
    },
    methods: {
        async getProducts() {
            this.loading = true;

            let resp = await WooProduct.listing( this.productsInfo.perPageProcductLimit, this.productsInfo.currentPage);
            console.log("resp", resp)
            this.products = resp.data;
            this.loading = false;

        },
        async paginatorFunc() { // <---

            let resp = await WooProduct.all();
            console.log("pagi", resp.data.length)
            
            this.productsInfo.totalProducts = resp.data.length

            let pagiLimit = (this.productsInfo.totalProducts ) / this.productsInfo.perPageProcductLimit;

            console.log(  (this.productsInfo.totalProducts ) + " ~ " + this.productsInfo.perPageProcductLimit )

            let integr = Math.floor(pagiLimit), decimal = pagiLimit - integr;

            let pagi = integr;
            console.log({integr, decimal})
            if(decimal !== 0 ) {
                pagi=integr +1 
            }  
            
            console.log( {pagi} )
            this.productsInfo.paginations = pagi;
            
        },

        fetchNextPage( gotoPageNum ) {
            console.log("fetchNextPage", gotoPageNum )
            this.productsInfo.currentPage = gotoPageNum;
            this.getProducts()
        }

    },
    mounted() {
        this.getProducts()
        this.paginatorFunc() // <---
    }
}
</script>
 
```






















## Boilerplate

### Create API for site settings
- Add this code in ```functions.php```
- API Endpoint: ```your-project.url/wp-json/site_setting/v1/all```

- Login into ```Wordpress > Appearnce > Customize``` update setting ( optional ).

Note: Use child theme and follow this folder structure.

// functions.php
```js
<?php
include "functions/api_site_settings.php";
```

// functions/api_site_settings.php
```js
<?php
add_action( 'rest_api_init', function () {
	register_rest_route( 'site_settings/v1', '/all', array(
	  'methods' => 'GET',
	  'callback' => 'handle_get_all',
        //   'permission_callback' => function () {
        //   	return current_user_can( 'edit_others_posts' );
        //   }
	) );
  } );
  
  function handle_get_all( $data ) {
	  global $wpdb;
	  $query = "SELECT * FROM `wp_options` 
	  			where
				  	option_name = 'site_logo'
				OR option_name = 'blogname'
				OR option_name = 'site_icon'
				OR option_name = 'blogdescription' 
	   		";
	  $list = $wpdb->get_results($query);
	  
	  $resp = array();
	 
	  for($i=0;$i< count($list) ;$i++) { 
	  	$resp += array(
		  $list[$i]->option_name => $list[$i]->option_value,
		);
	  }
	 
	return $resp;
  }
```






// services/siteSettings.js
```js
// import { API_POSTS_URL, CONFIG } from "../../config/config";
import axios from 'axios';

const API_SITE_SETTINGS_URL = '/site_settings/v1/all';
const API_SITE_LOGO_URL = '/wp/v2/media/';

export default {
    all() {
        console.log("Site Settting Services works...");
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_SITE_SETTINGS_URL )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    siteLogo( _LogoId ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_SITE_LOGO_URL + _LogoId )
    }
}
```






// views/frontend/layout/Header.vue
```js
<template>
//...
    <a class="navbar-brand" href="#">
        <span v-if="siteLogo">
           <img :src="siteLogo" alt="">
        </span>
        <span v-else>No Logo</span>
    </a>
//...
</template>


<script>
import siteSettingsService from '@/services/siteSettings/siteSettings'

export default {
  name: "Header",
  data() {
    return {
       siteLogo: null,
       siteInfo: [],
    }
  },
  methods: {
    async getSiteInfo() { // calling in created()
      try {
        let resp = await siteSettingsService.all() // Getting Site Setting All Info.
        this.siteInfo = resp.data;
        console.log("site Info: ", this.siteInfo )

        this.getSiteLogo( this.siteInfo.site_logo ) // Getting Logo URL
        
      } catch ( err ) {
        console.warn("site Info Err", err )
      }
      
    },
    async getSiteLogo( _logoId ) {
      try {
        let resp = await siteSettingsService.siteLogo( _logoId )
        this.siteLogo = resp.data.source_url // Store into data()

        console.log("site logo", resp)
      } catch (err) {
        console.warn("site logo Err", err )
      }
    }
  },
  created() {
    this.getSiteInfo()
  }
}
</script>
```








### Menus API 
- Add plugin ```WP API Menus``` ( https://wordpress.org/plugins/wp-api-menus/ )
- Open URL ```your-project.url/wp-json/wp-api-menus/v2/menus/__MENU_ID__```











## Custom Post Type APIs

- Add CPT in Wordpress
// "functions/cpt_hero_carousel.php";
```js
<?php

/****my_slider_args category in posttype***/
$my_slider_args = array(
    'labels' => array(
    'name' => 'hero_slider',
    'singular_name' => 'hero_slider'),
    'description' => 'Allows you to build custom hero_slider items and link them to categories',
	'menu_icon' => 'dashicons-images-alt2',
    'public' => true,
    'show_ui' => true,
    'menu_position' => 20,
    'supports' => array('title', 'editor', 'thumbnail'),
    'has_archive' => true,
    'rewrite' => array('slug' => 'hero_slider'),
    'can_export' => true
);

/* http://codex.wordpress.org/Function_Reference/register_post_type */
register_post_type('hero_slider', $my_slider_args);

$categories_labels = array(
    'label' => 'Categories',
    'hierarchical' => true,
    'query_var' => true
);

/*  Register taxonomies for extra post type capabilities */
register_taxonomy('my_slider_categories', 'hero_slider', $categories_labels);
/****./my_slider_args in posttype***/
```




- Add API 
// "functions/api_cpt_hero_carousel.php";
```js
<?php 

add_action( 'init', 'hero_slider_cpt' );
function hero_slider_cpt() {
    $args = array(
      'public'       => true,
      'show_in_rest' => true,
      'label'        => 'hero_slider'
    );
    register_post_type( 'hero_slider', $args );
}
```








#### Fetch Custom Post Type in Vue

// services/post/custom_post_types.js
```js
import { CONFIG } from "../../config/config";
import axios from 'axios';

const API_CPT_URL = '/wp/v2/';

export default {
    all( _CPT_NAME ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_CPT_URL + _CPT_NAME )
        // NOTE: dont need .then() here, add async awiat where you want to fetch
    },
    listing(perPageLimit=1, pageNumber=1) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_CPT_URL+`?per_page=${perPageLimit}&page=${pageNumber}` )
    },
    add(payload) {
        return axios.post( process.env.VUE_APP_API_BASE_URL + API_CPT_URL , payload , CONFIG );
    },
    delete(id) {
        return axios.delete( process.env.VUE_APP_API_BASE_URL + API_CPT_URL + id, {}, CONFIG);
    },
    edit(payload, id) {
        return axios.patch( process.env.VUE_APP_API_BASE_URL + + API_CPT_URL + id , payload , CONFIG);
    }
}
```


// HomePage.vue
```js
<template>
    <div>        
        <section class="hero-area" id="heroArea">
            <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <template v-for="( item, index ) in heroCarousel" :key="index">
                        <button type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to="0"
                                :class=" index==0 ? 'carousel-item active' : 'carousel-item' "
                                aria-current="true"
                                aria-label="Slide 1"></button>
                    </template>
                </div>
                <div class="carousel-inner">
                    <template v-for="( item, index ) in heroCarousel" :key="index">
                        <div :class=" index==0 ? 'carousel-item active' : 'carousel-item' ">
                           <div class="row">
                               <div class="col-md-6">
                                   <h2>{{item.title.rendered}}</h2>
                                   <span v-html="item.content.rendered"></span>
                               </div>
                               <div class="col-md-6">
                                   IMG ID:  {{item.featured_media}}
                               </div>
                           </div>
                        </div> 
                    </template>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>

    </div>
</template>

<script>
import cptService from '@/services/post/custom_post_types.js'

export default {
    name: "Home_Page",
    data() {
        return {
            heroCarousel: [],
            pageData: [],
        }
    },
    methods: {
        async getHeroCarousel() {
            try {
                let resp = await cptService.all('hero_slider');
                console.log( "getHeroCarousel -> resp", resp.data )
                this.heroCarousel = resp.data;
            }
            catch (err) {
                console.log("getHeroCarousel -> Err -> ", err )
            }
        }
    },
    mounted(){
        console.log("Ready!");
        this.getHeroCarousel()
    }
}
</script>
```











### Single Media Service and Template

 
// media.js
```js
import axios from 'axios';

const API_MEDIA_URL = '/wp/v2/media/';

export default {
    all() {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL)
    },
    single( _imageId ) {
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL + _imageId )
    },
    singleUrl( _imageId ) { // <--
        return axios.get( process.env.VUE_APP_API_BASE_URL + API_MEDIA_URL + _imageId )
    }
}

```






// HomePage.vue
```js
<script>
import cptService from '@/services/post/custom_post_types.js'
import mediaService from '@/services/media/media.js'

export default {
    name: "Home_Page",
    data() {
        return {
            heroCarousel: [],
            pageData: [],
        }
    },
    methods: {
        async getHeroCarousel() {
            try {
                let resp = await cptService.all('hero_slider');
                
                /*
                  Getting Each Image URL by Loop
                */
                for (let singleData of resp.data ) {
                    await mediaService.single( singleData.featured_media ).then( response => {
                          //console.log("Single URL -> ", response.data.guid.rendered)
                          singleData.featured_media = response.data.guid.rendered; // stored into `featured_media`
                       }
                    ) 
                }
                
                this.heroCarousel = resp.data;
                console.log("this.heroCarousel", this.heroCarousel )
            }
            catch (err) {
                console.log("getHeroCarousel -> Err -> ", err )
            }
        }
    },
    mounted(){
        console.log("Ready!");
        this.getHeroCarousel()
    }
}
</script>
```