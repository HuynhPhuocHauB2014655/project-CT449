<template>
    <tr>
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
    </tr>
</template>
<script>
import BookService from '@/services/book.service';
export default {
    props:{
        rentBook: {type: Object,required:true},
        index:{type:Number},
    },
    data(){
        return{
            book: {},
        }
    },
    methods:{
        async getBook(){
            this.book = await BookService.get(this.rentBook.maSach);
        }
    },
    mounted(){
        this.getBook();
    }
}
</script>