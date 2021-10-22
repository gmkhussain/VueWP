<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" v-if="currentPage>1">
                <a class="page-link" @click="pagiFunc(currentPage-1)">Prev</a>
            </li>
          <template v-for="(page, index) in pages" :key="index">
            <li :class="(index+1===currentPage) ? 'page-item active' : 'page-item'">
                <a class="page-link " @click="pagiFunc(index+1)" >{{index+1}}</a>
            </li>
          </template>
            <li class="page-item" v-if="pages>1">
                <a class="page-link" @click="pagiFunc(currentPage+1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    props: { 
        totalRecords: { 
            type: Number,
            default: 0
        },
        currentPage: { 
            type: Number,
            default: 0
        },
        perPage: { 
            type: Number,
            default: 0
        },
        pages: { 
            type: Number,
            default: 0
        },
        pagiFunc: {
            type: Function
        }
    },
    methods: {
        
    },
    mounted() {
        console.log(this.pagiFunc)
    }
}
</script>