<template>
    <div class="row">
        <div class="col-md-10">
            <SearchBook v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh Sach Book
                <i class="fas fa-book"></i>
            </h4>
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex"
                @click="retrieveNxb(activeBook.maNxb)" />
            <p v-else>Không có sách nào.</p>


            <!-- ----------------------------------------------------------------- -->
            <div class="mt-3 row agign-items-center">
                <button class="btn col btn-sm btn-outline-primary me-2" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm col btn-outline-success me-2" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button class="btn btn-sm col btn-outline-danger" @click="removeAllBooks">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <!-- ----------------------------------------------------------------- -->
        <div class="mt-3 col-md-6">
            <div v-if="activeBook != null">
                <h4>
                    Thông tin chi tiết sách
                    <i class="fas fa-book"></i>
                </h4>
                <BookCard :book="activeBook" :tenNXB="tenNxb" />
                <router-link :to="{
                    name: 'book-edit',
                    params: { id: activeBook._id }
                }">
                    <span class="mt-2">
                        <button class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </button>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>

import BookList from "@/components/BookList.vue";
import BookCard from "@/components/BookCard.vue";
import BookService from "@/services/book.service";
import SearchBook from "@/components/InputSearch.vue";
import NxbService from "@/services/nxb.service";
export default {
    components: {
        SearchBook,
        BookList,
        BookCard,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
            nxb: [],
            tenNxb: "",
            userName: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { tenSach } = book;
                return [tenSach].join();
            });
        },
        filteredBooks() {
            if (!this.searchText) {
                return this.books;
            }
            return this.books.filter((_book, index) => {
                return this.bookStrings[index].includes(this.searchText)
            });


        },
        activeBook() {
            if (this.activeIndex < 0) {
                return null;
            }
            else {
                return this.filteredBooks[this.activeIndex];
            }

        },

        filteredBooksCount() {
            return this.filteredBooks.length;

        },
        getUserName() {
            this.userName = sessionStorage.getItem('userName');
            return this.userName;
        }
    },
    methods: {
        async retrieveNxb(id) {
            try {
                this.nxb = await NxbService.get(id);
            } catch (error) {
                console.log(error);
            }
            this.tenNxb = this.nxb.tenNxb;
        },
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sach?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        goToAddBook() {
            this.$router.push({ name: "book-add" });
        },
    },
    mounted() {
        if (!this.getUserName) {
            this.$router.replace({ name: "login" });
        }
        this.refreshList();
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded');
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    },
};
</script>
