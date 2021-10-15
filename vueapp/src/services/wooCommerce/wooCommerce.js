// import { API_POSTS_URL } from "../../config/config";

import axios from "axios";

// import Oauth from "oauth-1.0a";
// import CryptoJS from "crypto-js";
// import jQuery from "jquery";


/* 
    ?oauth_consumer_key=ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f&oauth_nonce=6ftDiQuNihag0tSLZWfIy9essqZ3pRLv&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1634312003&oauth_version=1.0&oauth_signature=lObwiJdWcjT%2BXXvmTK50016ftJw%3D
*/

// const oauth_ = getOauth();

// function getOauth() {
//     return Oauth({
//     consumer: { key: CK, secret: CS },
//     signature_method: 'HMAC-SHA1',
//     hash_function(base_string, key) {
//         return CryptoJS
//             .createHmac('sha1', key)
//             .update(base_string)
//             .digest('base64')
//     },
//  })
// }

// const WOO_CONFIG = {
//     consumer: {
//       key: CK,
//       secret: CS
//     }
//   };


export default {
    listing() {
        // console.log( oauth_)
       // return axios.get( process.env.VUE_APP_API_BASE_URL + PRODUCT_API_URL+'?'+oauth_ )
    }
}
