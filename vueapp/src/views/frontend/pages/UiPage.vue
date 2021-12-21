<template>
    <section class="login">
        <div class="container">
           <UiTable heading="head1" :mydata="mydata" :myreq="myreq" />
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
                name: "Amoos",
                phone: "123",
                city: "London"
            },
            {
                name: "Andy",
                phone: "789",
                city: "Paris"
            }
          ],
          myreq: ["name", "phone", "city"]
        }
    },
    methods: {

    } 
}
</script>