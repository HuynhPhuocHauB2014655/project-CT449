<template>
    <h2>{{ book.tenSach }}</h2>
    <div class="ms-2">
        <p><b>Tác giả: </b> {{ book.tacGia }}</p>
        <p><b>Năm xuất bản: </b>{{ book.namXuatBan }}</p>
        <p><b>Nhà xuất bản: </b>{{ tenNxb }}</p>
        <p><b>Số quyển: </b>{{ book.soQuyen }}</p>
    </div>
</template>
<script>
import nxbService from '@/services/nxb.service';
export default {
    props: {
        book: { type: Object },
    },
    data() {
        return {
            tenNxb: "",
        }
    },
    methods: {
        async getTenNxb(id) {
            try {
                const result = await nxbService.get(id);
                this.tenNxb = result.tenNxb;
            } catch (error) {
                console.log("Lỗi", error);
            }
        }
    },
    created() {
        this.getTenNxb(this.book.maNxb);
    }
}
</script>