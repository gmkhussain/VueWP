<template>
    <section class="login">
        <div class="container">

          <!-- <UiTable heading="head1" :mydata="mydata" :myreq="myreq" /> -->
          <!-- Required Fields from data() -->

          <UiTable heading="head1" :mydata="mydata" :myreq='["name", "address"]' />
          <!-- Required Fields Inline -->

        </div>
    </section>
</template>

<script>
import UiTable from '@/ui/UiTable'

export default {
    name: "Ui_Page",
    components: {
      UiTable,
    },
    data() {
        return {
          mydata: [
            {
                name: "abc",
                phone: "123",
                address: {
                  city: "London",
                  zipcode: "10024"
                }                
            },
            {
                name: "Andy",
                phone: "789",
                address: {
                  city: "Paris",
                  zipcode: "10024"
                }
            }
          ],
          myreq: ["name", "phone", "city"]
        }
    },
    methods: {

    } 
}
</script>