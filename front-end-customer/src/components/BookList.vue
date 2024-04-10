<template>
    <ul class="list-group">
        <li class="list-group-item list-group-item-action list-group-item-info" v-for="(book, index) in books"
            :key="book._id" @click="showBook(index)" :class="{ 'active': index === bookIndex }">
            <span>{{ book.tenSach }}</span>
            <div v-if="book.soQuyen > 0" class="text-end text-success">
                Còn: {{ book.soQuyen }}
            </div>
            <div v-else class="text-end text-danger">Còn: {{ book.soQuyen }}</div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        books: { type: Array, required: true },
    },
    data() {
        return {
            bookIndex: -1,
        }
    },
    emits: ["show:book"],
    methods: {
        showBook(bookIndex) {
            if (this.bookIndex == bookIndex) {
                // If the clicked item is already active, remove the active state
                this.bookIndex = -1;
                this.$emit("show:book", this.bookIndex);
            } else {
                // Otherwise, set the clicked item as active
                this.bookIndex = bookIndex;
                this.$emit("show:book", bookIndex);
            }
        },
        toggleActive(index) {
            if (this.bookIndex == index) {
                // If the clicked item is already active, remove the active state
                this.bookIndex = -1;
            } else {
                // Otherwise, set the clicked item as active
                this.bookIndex = index;
            }
        }
    }
}
</script>