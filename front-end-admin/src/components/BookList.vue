<script>
    export default {
        props: {
            books: { type: Array, default: []},
            activeIndex: {type: Number, default: -1},
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            }
        }        
    };
</script>

<template>
    <ul class="list-group">
        <li 
            class="list-group-item d-flex justify-content-between"
            v-for="(book, index) in books"
            :key="book.id"
            :class="{ 'active': index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            {{ book.tenSach }}
            <span v-if="book.soQuyen > 0">
                Còn: {{ book.soQuyen }}
            </span>
            <span v-else class="text-danger">Còn: {{ book.soQuyen }}</span>
        </li>
    </ul>
</template>