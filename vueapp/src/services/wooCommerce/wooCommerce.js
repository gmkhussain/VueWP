// import { API_POSTS_URL } from "../../config/config";

import axios from "axios";
import Oauth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import jQuery from "jquery";

const ck = "ck_432c317baedf649171824da3bfe75457323815a3";
const cs = "cs_1c3633593f8664ea25d3f4b55373dd05e20ff5d2";
const baseURL = process.env.VUE_APP_API_BASE_URL;

const Woocommerce = {
  getProducts: () => {
    return makeRequest("/wc/v3/products");
  },
  getProductByID: id => {
    return makeRequest("/wc/v3/products/" + id);
  }
};

function makeRequest(endpoint, method = "GET") {
  const oauth = getOauth();

  const requestData = {
    url: baseURL + endpoint,
    method
  };

  const requestHTTP =
    requestData.url + "?" + jQuery.param(oauth.authorize(requestData));

    console.log("requestHTTP", requestHTTP)

  return axios.get(requestHTTP);
}

function getOauth() {
  return Oauth({
    consumer: {
      key: ck,
      secret: cs
    },
    signature_method: "HMAC-SHA1",
    hash_function: function(base_string, key) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    }
  });
}

export default Woocommerce;