<template>
    <div>
      <strong>{{heading}}</strong>
      <table class="table">
        <thead>
          <td v-for="( r, idx ) in myreq" :key="idx">
            {{r}}
          </td>
        </thead>
        <tbody>
            <tr v-for="( data, name , index ) in mydata" :key="index">
              <!-- <td>{{data[req]}}</td> -->
              <!-- <td>{{data.phone}}</td> -->
              <td v-for="( r, idx ) in myreq" :key="idx">
                  
                {{data[r]}}
                {{data[r].address}}
                
                <!-- <div v-if="data[r][idx]">dd</div> -->

              </td>
              
              <!-- <td>
                {{data.name}}
              </td>
              <td>
                <span>Address</span>
                <p v-for="(rd, idx2) in data.address" :key="idx2">
                  {{rd.city}} | {{rd.zipcode}}
                </p>
              </td> -->
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
