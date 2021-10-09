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
