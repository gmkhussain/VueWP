<template>
    <header class="header">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                      <span v-if="siteLogo">
                        <img :src="siteLogo" alt="" />
                      </span>
                      <span v-else>No Logo</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link" to="/posts">Blog</router-link>
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link" to="/products">Products</router-link>
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link" to="/contact">Contact</router-link>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            UIs
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                              <router-link class="nav-link" to="/ui">UI Table</router-link>
                            </li>
                          </ul>
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                      </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>


<script>
import siteSettingsService from '@/services/siteSettings/siteSettings'
import menusService from '@/services/menus/menus'

export default {
  name: "Header",
  data() {
    return {
       siteLogo: null,
       siteInfo: [],
       mainNav: [],
       errorFeedback: null
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
        this.errorFeedback = err
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
    },

    async getMenus() {
        try {
          let resp = await menusService.all()
          
          console.log("Menu:", resp.data[0].ID )

          this.getMenuItems( resp.data[0].ID )

        } catch( err ) {
          console.warn("Menu", err )
        }
    },

    async getMenuItems( _id ) {
        let respMenu = await menusService.menu( _id )
        console.log("respMenu: ",  respMenu )
        this.mainNav = respMenu;
    }

  },
  created() {
    this.getSiteInfo()
    this.getMenus()
  }
}
</script>



<style scoped>
.navbar-brand {
  max-height: 40px;
}
.navbar-brand img {
  width: 100px;
  height: 40px;
}
</style>