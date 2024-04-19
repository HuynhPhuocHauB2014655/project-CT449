<template>
    <div class="row m-auto">
        <form @submit.prevent="rentBook" class="col-sm border rounded p-2 me-2">
            <h4 class="text-center mb-3 border-bottom pb-2">Đăng kí mượn sách</h4>
            <div class="form-group row mb-2">
                <label for="maDocGia" class="col-sm col-form-label">Mã đọc giả: </label>
                <div class="col-sm-9">
                    <input type="text" name="maDocGia" v-model="rent.maDocGia" class="form-control"
                        placeholder="Nhập Mã Đọc Giả" />
                    <div v-if="rent.maDocGia" class="ms-2">
                        <div v-if="!checkMaDocGia" class="mt-2 text-danger">Không tìm thấy đọc giả</div>
                        <div v-else class="mt-2 text-success">Tên đọc giả: {{ checkMaDocGia }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group row mb-2">
                <label for="maSach" class="col-sm col-form-label">Mã sách: </label>
                <div class="col-sm-9">
                    <input type="text" name="maSach" v-model="rent.maSach" class="form-control"
                        placeholder="Nhập Mã Sách" />
                    <div v-if="rent.maSach" class="ms-2">
                        <div v-if="!checkMaSach" class="mt-2 text-danger">Mã sách không đúng</div>
                        <div v-else-if="checkMaSach == 1" class="mt-2 text-danger">Sách đã hết</div>
                        <div v-else class="mt-2 text-success">Tên sách: {{ checkMaSach }}</div>
                    </div>
                </div>
            </div>
            <div class="form-group row mb-2">
                <label for="ngaymuon" class="col-sm col-form-label">Ngày mượn: </label>
                <div class="col-sm-9">
                    <input type="date" required name="ngaymuon" v-model="rent.ngayMuon" class="form-control"
                        id="ngaymuon" />
                </div>
            </div>
            <div class="form-group row ">
                <label for="ngaytra" class="col-sm col-form-label">Ngày Trả: </label>
                <div class="col-sm-9">
                    <input type="date" required name="ngaytra" :min="rent.ngayMuon" v-model="rent.ngayTra"
                        class="form-control" id="ngaytra" />
                </div>
            </div>
            <button class="btn btn-outline-primary mt-5" v-if="checkMaDocGia && checkMaSach">Đăng kí</button>
            <button class="btn btn-outline-secondary mt-5" v-else disabled>Đăng kí</button>
        </form>
        <div class="col-sm border rounded p-2">
            <h4 class="text-center mb-3 border-bottom pb-2">Sách hiện có</h4>
            <ul class="list-group">
                <li v-for="(book, index) in books" :key="book._id"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    <div v-if="book.soQuyen > 0">{{ index + 1 }}. - {{ book._id }} - {{ book.tenSach }} - Còn: {{
                        book.soQuyen }}</div>
                    <div v-else class="text-danger">{{ index + 1 }}. - {{ book._id }} - {{ book.tenSach }} - Còn: {{
                        book.soQuyen }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.error-feedback {
    color: red;
}
</style>
<script>
import BookService from "@/services/book.service";
import DocgiaService from "@/services/docgia.service";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
export default {
    data() {
        return {
            docgias: [],
            books: [],
            rent: {
                maSach: "",
                maDocGia: "",
                ngayMuon: new Date().toISOString().substr(0, 10),
                ngayTra: "",
                trangThai: 0,
            },
            message: "",
        }
    },
    computed: {
        docGiaToString() {
            return this.docgias.map((docgia) => {
                const { _id } = docgia;
                return [_id].join();
            });
        },
        bookToString() {
            return this.books.map((book) => {
                const { _id } = book;
                return [_id].join();
            });
        },
        checkMaDocGia() {
            if (this.rent.maDocGia) {
                const index = this.docGiaToString.indexOf(this.rent.maDocGia);
                if (index >= 0) {
                    return this.docgias[index].hoLot + " " + this.docgias[index].ten;
                }
                else {
                    return null;
                }
            }
        },
        checkMaSach() {
            if (this.rent.maSach) {
                const index = this.bookToString.indexOf(this.rent.maSach);
                if (index >= 0) {
                    if(this.books[index].soQuyen <=0)
                    {
                        return 1;
                    }
                    return this.books[index].tenSach;
                }
                else {
                    return null;
                }
            }
        }
    },
    methods: {
        async getData() {
            try {
                this.books = await BookService.getAll();
                this.docgias = await DocgiaService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async rentBook() {
            try{
                const result = await TheoDoiMuonSachService.create(this.rent);
                const book = await BookService.get(this.rent.maSach);
                book.soQuyen -= 1;
                await BookService.update(this.rent.maSach,book);
                alert("Đăng kí mượn sách thành công!");
                location.reload();
            }
            catch(error){
                console.log(error);
            }
        }
    },
    created() {
        this.getData();
    }
}
</script>