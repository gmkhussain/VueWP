<template>
    <div>
        cart
        <table class="table">
            <tr v-for="(item, index) in cart" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.quantity.value}}</td>
                <td>{{item.total}}</td>
                <td> <button @click="removeCartItem(index)">Remove</button> </td>
            </tr>
        </table>
    </div>
</template>

<script>
import CartService from '../../../../services/cart/cart';

export default {
    name: "Cart_Page",
    data() {
        return {
            cart: []
        }
    },
    methods: {
        async getCart() {
            try {
                let resp = await CartService.view();
                console.log("Cart: ", resp)
                 this.cart = resp.data

            } catch(err) {
                console.log("Err", err)
            }
        },

        async removeCartItem( _key ) {
            try {
                let resp = await CartService.remove( _key )
                console.log( "Removed: ", resp )
                localStorage.setItem("cartHasItem", false )
            } catch(err) {
                console.log("Err", err)
            }
        }


    },
    mounted(){
        this.getCart()
    }
}
</script>
