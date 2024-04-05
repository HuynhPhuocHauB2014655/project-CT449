<template>
    <div class="row">
        <h4>Thêm sách <span class="text-danger fs-4">{{ message }}</span></h4>
        <BookForm :book="book" :type="type" @submit:book="addBook" />
    </div>
</template>

<script>
import BookService from "@/services/book.service.js";
import BookForm from "@/components/BookForm.vue";

export default {
    components: {
        BookForm,
    },
    data() {
        return {
            book: {
                masach: "",
                tenSach: null,
                donGia: null,
                soQuyen: null,
                namXuatBan: null,
                maNxb: null,
                tacgia: null
            },
            type: "add",
            message:""
        };

    },
    methods: {
        async addBook(data) {
            try {
                await BookService.create(data);
                alert("Thêm sách thành công");
            } catch (error) {
                this.message = error.response.data.message;
            }
        }
    },
};
</script>