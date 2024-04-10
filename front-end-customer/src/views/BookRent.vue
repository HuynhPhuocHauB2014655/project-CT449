<template>
    <div v-if="rentBooks.length == 0" class="text-center fs-3 m-auto text-light p-5 content rounded border border-3">
        Không tìm thấy lịch sử mượn sách của bạn
    </div>
    <div v-else class="m-auto p-5 content rounded border border-3 w-75">
        <table class="table table-hover table-info">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Ngày mượn</th>
                <th>Hạn trả</th>
            </tr>
        </thead>
        <tbody>
            <RentCard v-for="(book,index) in rentBooks" :key="book.maDocGia" :rentBook="book" :index="index"/>
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
        }
    },
    components:{
        RentCard,
    },
    methods: {
        async getRentBooks(){
            this.rentBooks = await theodoimuonsachService.get(sessionStorage.getItem("userName"));
        }
    },
    mounted(){
        this.getRentBooks();
    }
}
</script>