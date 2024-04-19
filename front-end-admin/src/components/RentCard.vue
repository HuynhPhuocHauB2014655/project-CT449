<template>
    <tr>
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.maDocGia }}</td>
        <td>{{ docgia.hoLot }} {{ docgia.ten }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td v-if="rentBook.trangThai == 0"><button class="btn btn-sm btn-outline-danger" @click="TraSach(rentBook)">Xác nhận trả sách</button></td>
        <td v-else class="text-success">Đã trả sách</td>
    </tr>
</template>
<script>
import BookService from '@/services/book.service';
import DocGiaService from '@/services/docgia.service'
export default {
    props:{
        rentBook: {type: Object,required:true},
        index:{type:Number},
    },
    data(){
        return{
            book: {},
            docgia:{},
        }
    },
    emits:["xacnhan:trasach"],
    methods:{
        async getData(){
            this.book = await BookService.get(this.rentBook.maSach);
            this.docgia = await DocGiaService.get(this.rentBook.maDocGia);
        },
        TraSach(rent){
            if(confirm("Bạn có chắc chắn về hành động này?"))
            {
                this.$emit("xacnhan:trasach",rent);
            }
        }
    },
    mounted(){
        this.getData();
    }
}
</script>