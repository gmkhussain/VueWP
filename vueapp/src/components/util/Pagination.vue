<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" v-for="(page, index) in pages" :key="index">
                <a class="page-link" @click="pagiFunc(index+1)" >{{index+1}}</a>
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