<template>
    <tr v-if="type == -1">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td v-if="rentBook.trangThai == 0" class="text-danger">Chưa trả sách</td>
        <td v-else class="text-success">Đã trả sách</td>
    </tr>
    <tr v-else-if="type == 1 && rentBook.trangThai == 1">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td class="text-success">Đã trả sách</td>
    </tr>
    <tr v-else-if="type == 0 && rentBook.trangThai == 0">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td class="text-danger">Chưa trả sách</td>
    </tr>
</template>
<script>
import BookService from '@/services/book.service';
export default {
    props:{
        rentBook: {type: Object,required:true},
        index:{type:Number},
        type:{type:Number},
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