<template>
    <div>
      
      <strong>{{heading}}</strong>
      
      <table class="table">
        <tbody>
            <tr v-for="( data, index ) in mydata" :key="index">
              <!-- <td>{{data[req]}}</td> -->
              <!-- <td>{{data.phone}}</td> -->
              <td v-for="( r, idx ) in myreq" :key="idx">
                <!-- {{idx}}
                {{r}} -->
                {{data[r]}}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default{
    name: "UiTable",
    props: {
        heading: String,
        mydata: Array,
        myreq: String
    },
    // data() {
    //     return {
    //         theData: []
    //     }
    // },
    // mounted() {
    //     console.log("this.mydata", this.mydata)
    //     this.theData = this.mydata
    // }
}
</script>
