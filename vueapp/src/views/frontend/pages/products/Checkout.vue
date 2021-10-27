<template>
    <div>
        <h4>Checkout</h4>
    </div>
</template>

<script>
import CheckoutService from '../../../../services/checkout/checkout';

export default {
    name: "Checkout_Page",
    data() {
        return {
            mydata: {
                "payment_method": "bacs",
                "payment_method_title": "Direct Bank Transfer",
                "set_paid": true,
                "billing": {
                    "first_name": "John",
                    "last_name": "Doe",
                    "address_1": "969 Market",
                    "address_2": "",
                    "city": "San Francisco",
                    "state": "CA",
                    "postcode": "94103",
                    "country": "US",
                    "email": "john.doe@example.com",
                    "phone": "(555) 555-5555"
                },
                "shipping": {
                    "first_name": "John",
                    "last_name": "Doe",
                    "address_1": "969 Market",
                    "address_2": "",
                    "city": "San Francisco",
                    "state": "CA",
                    "postcode": "94103",
                    "country": "US"
                },
                "line_items": [
                    {
                    "product_id": 93,
                    "quantity": 2
                    },
                    {
                    "product_id": 22,
                    "variation_id": 23,
                    "quantity": 1
                    }
                ],
                "shipping_lines": [
                    {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": "10.00"
                    }
                ]
            },
        }
    },
    methods: {
        
        async postOrder() {
            try {
                let resp = await CheckoutService.add( this.mydata );
                console.log("Cart: ", resp)
                 this.cart = resp.data

            } catch(err) {
                console.log("Err", err)
            }
        },
    },
    mounted(){
        this.postOrder()
    }
}
</script>
