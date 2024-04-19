<template>
    <div v-if="rentBooks.length == 0" class="text-center fs-3 m-auto text-light p-5 content rounded border border-3">
        Không tìm thấy lịch sử mượn sách của bạn
    </div>
    <div v-else class="m-auto p-5 content rounded border border-3 w-75">
        <div class="justify-content-end d-flex mb-2">
            <button class="btn btn-sm btn-outline-light me-1" @click="showType(-1)">Tất cả</button>
            <button class="btn btn-sm btn-outline-light me-1" @click="showType(1)">Đã trả</button>
            <button class="btn btn-sm btn-outline-light" @click="showType(0)">Chưa trả</button>
        </div>
        <table class="table table-hover table-info">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Ngày mượn</th>
                <th>Hạn trả</th>
                <th>Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <RentCard v-for="(book,index) in rentBooks" :key="book.maDocGia" :rentBook="book" :type="type" :index="index"/>
        </tbody>
    </table>
    </div>
</template>
<script>
import theodoimuonsachService from '@/services/theodoimuonsach.service';
import RentCard from '@/components/RentCard.vue';
export default {
    data() {
        return {
            rentBooks:[],
            type:-1,
        }
    },
    components:{
        RentCard,
    },
    methods: {
        async getRentBooks(){
            this.rentBooks = await theodoimuonsachService.get(sessionStorage.getItem("userName"));
        },
        showType(type){
            this.type = type;
        }
    },
    mounted(){
        this.getRentBooks();
    }
}
</script>