<template>
    <div v-if="book">
        <div class="row">
            <h2>Hiệu chỉnh sách <span class="text-danger fs-4">{{ message }}</span></h2>
            <BookForm :book="book" :type="type" @submit:book="updateBook" @delete:book="deleteBook" />
        </div>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from '@/components/BookForm.vue';
import BookService from '@/services/book.service';

export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            type: "edit",
            message:"",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
            } catch (error) {
                console.log(error);

                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$router.path.split("/").slice(1)
                    },
                    query: this.$router.query,
                    hash: this.$router.hash,
                });
            }
        },

        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                alert("Chỉnh sửa sách thành công");
                this.$router.push({ name: 'homeBook' });
            } catch (error) {
                this.message = error.response.data.message;
            }
        },

        async deleteBook() {
            if (confirm("Bạn muốn xóa sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    alert("Xóa sách thành công");
                    this.$router.push({ name: "homeBook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id),
            this.message = "";
    },
};
</script>