<template>
    <div class="row w-75 mx-auto border border-3 rounded p-3 content" style="margin-top: 100px;">
        <div class="col-4 p-0 me-1">
            <BookList :books="books" :bookIndex="bookIndex" @show:book="getShowBook" />
        </div>
        <div class="col rounded" v-if="bookIndex >= 0" style="background: #cff4fc;">
            <BookCard :book="filteredBooks" />
            <div v-if="filteredBooks.soQuyen > 0">
                <button type="button" class="btn btn-outline-secondary" @click="showRent">Đăng kí mượn</button>
                <form @submit.prevent="RentBook(filteredBooks)" style="width: 50%;"
                    class="border rounded border-2 p-2 border-primary mt-2" v-if="showRentBook">
                    <label class="form-lable">Ngày mượn</label>
                    <input v-model="rentBook.ngayMuon" type="date" class="form-control" required disabled />
                    <label class="form-lable">Ngày trả</label>
                    <input v-model="rentBook.ngayTra" :min="rentBook.ngayMuon" type="date" required class="form-control" />
                    <button class="btn btn-outline-primary mt-2">Xác nhận</button>
                </form>
            </div>
            <div v-else>
                Đã hết
            </div>
        </div>
    </div>
</template>
<script>
import BookService from '@/services/book.service';
import BookList from '@/components/BookList.vue';
import BookCard from '@/components/BookCard.vue';
import theodoimuonsachService from '@/services/theodoimuonsach.service';
export default {
    data() {
        return {
            books: [],
            bookIndex: -1,
            rentBook: {
                maDocGia: "",
                maSach: "",
                ngayMuon: new Date().toISOString().substr(0, 10),
                ngayTra: "",
                trangThai:0
            },
            showRentBook:false,
        }
    },
    components: {
        BookList,
        BookCard,
    },
    computed: {
        filteredBooks() {
            return this.books[this.bookIndex];
        }
    },
    methods: {
        showRent(){
            this.showRentBook = !this.showRentBook;
        },
        async getBook() {
            try {
                this.books = await BookService.getAll();
            }
            catch (error) {
                console.log('There was an error!', error);
            }
        },
        getShowBook(bookIndex) {
            this.bookIndex = bookIndex;
        },
        async RentBook(book) {
            this.rentBook.maDocGia = sessionStorage.getItem("userName");
            this.rentBook.maSach = book._id;
            console.log(book);
            try{
                const result = await theodoimuonsachService.create(this.rentBook);
                book.soQuyen =book.soQuyen - 1;
                await BookService.update(book._id,book);
                alert("Đăng kí mượn sách thành công!");
            }
            catch(error){
                console.log(error);
            }
        }
    },
    mounted() {
        if (localStorage.getItem('reloaded')) {
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        this.getBook();
    }
}
</script>