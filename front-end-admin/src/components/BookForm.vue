<template>
    <Form class="row border border-2 rounded px-3 pb-3 col-8" @submit="submitBook" :validation-schema="contactFormSchema">
        <div class="col">
            <div class="form-group">
                <label for="id">Mã sách:</label>
                <Field name="id" type="text" class="form-control" v-if="this.type == 'add'" v-model="bookLocal.masach" />
                <Field name="id" type="text" class="form-control" v-else v-model="bookLocal._id" disabled/>
                <ErrorMessage name="id" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="name">Tên sách:</label>
                <Field name="name" type="text" class="form-control" v-model="bookLocal.tenSach" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="dongia">Đơn Giá:</label>
                <Field name="dongia" type="text" class="form-control" v-model="bookLocal.donGia" />
                <ErrorMessage name="dongia" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="soquyen">Số Quyển:</label>
                <Field name="soquyen" type="number" inputmode="numberic" class="form-control" v-model="bookLocal.soQuyen" />
                <ErrorMessage name="soquyen" class="error-feedback" />
            </div>
        </div>
        <div class="col">
            <div class="form-group">
                <label for="namxuatban">Năm Xuất Bản:</label>
                <Field name="namxuatban" type="text" class="form-control" v-model="bookLocal.namXuatBan" />
                <ErrorMessage name="namxuatban" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="tacgia">Tác Giả:</label>
                <Field name="tacgia" type="text" class="form-control" v-model="bookLocal.tacGia" />
                <ErrorMessage name="tacgia" class="error-feedback" />
            </div>

            <div class="form-group">
                <label for="manxb">Mã Nhà Xuất Bản:</label>
                <Field name="manxb" type="text" class="form-control" v-model="bookLocal.maNxb" @change="getNxb" />
                <ErrorMessage name="manxb" class="error-feedback" />
            </div>
            <div class="form-group">
                <label for="manxb">Tên Nhà Xuất Bản:</label>
                <input type="text" class="form-control" v-model="tenNxb" disabled />
                <ErrorMessage name="manxb" class="error-feedback" />
            </div>
        </div>
        <div class="form-group mt-3">
            <button class="btn btn-primary"><i class="fa-solid fa-book"></i> Lưu</button>
            <button v-if="type == 'edit'" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                <i class="fas fa-trash"></i> Xóa
            </button>
        </div>
    </Form>
    <div class="col ms-4 border border-2 border-primary rounded">
                <h2>Nhà xuất bản hiện có</h2>
                <router-link :to="{
                    name: 'nxb-add'
                }">
                    <button class="btn btn-sm btn-outline-primary">Thêm NXB</button>
                </router-link>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Mã NXB</th>
                            <th>Tên NXB</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="nxb in nxb" :key="nxb._id">
                            <td>{{ nxb._id }}</td>
                            <td>{{ nxb.tenNxb }}</td>
                            <td>
                                <router-link :to="{name: 'nxb-edit', params: { id: nxb._id }}">
                                    <button class="btn btn-sm btn-outline-primary me-2">Sửa NXB</button>
                                </router-link>
                                <button class="btn btn-sm btn-outline-danger" @click=deleteNXB(nxb._id)>Xóa</button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NxbService from "@/services/nxb.service.js";

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true },
        type: { type: String, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            id: yup
                .string()
                .required("Mã Sách không được bỏ trống.")
                .min(2, "Mã sách phải có ít nhất 2 ký tự.")
                .max(10, "Mã sách có nhiều nhất 10 ký tự."),
            name: yup
                .string()
                .required("Tên sách không được bỏ trống.")
                .min(2, "Tên sách phải ít nhất 2 ký tự.")
                .max(50, "Tên sách có nhiều nhất 50 ký tự."),
            dongia: yup
                .string()
                .matches(/^[1-9][0-9]*$/, "Đơn giá không hợp lệ")
                .required("Đơn giá không được bỏ trống."),
            soquyen: yup
                .string()
                .matches(/^[0-9][0-9]*$/, "Số quyển không hợp lệ")
                .required("Số quyển không được bỏ trống.")
                .max(3, "Số quyển có nhiều nhất 3 ký tự."),
            namxuatban: yup
                .string()
                .matches(/^[1-9][0-9][0-9][0-9]$/, "Năm xuất bản không hợp lệ")
                .required("Năm xuất bản không được bỏ trống."),
        });
        return {
            bookLocal: this.book,
            contactFormSchema,
            tenNxb: "",
            nxb:[]
        };
    },
    methods: {
        async retrieveNxb() {
            try {
                this.nxb = await NxbService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        async loadTenNXB(){
            if(this.bookLocal._id)
            {
                var NXB;
                try {
                    NXB = await NxbService.get(this.bookLocal.maNxb);
                } catch (error) {
                    console.log(error);
                }
                this.tenNxb = NXB.tenNxb;
            }
        },
        getNxb() {
            var manxb = event.target.value;
            if (manxb != null) {
                for (let index = 0; index < this.nxb.length; index++) {
                    if (manxb == this.nxb[index]._id) {
                        this.tenNxb = this.nxb[index].tenNxb;
                        break;
                    }
                    else {
                        this.tenNxb = "NXB không tồn tại.";
                    }
                }
            }
            return this.tenNxb;
        },
        async deleteNXB(id){
            if(confirm("Bạn có chắc chắn muốn xóa nhà xuất bản " + id + " không?"))
            {
                try{
                    await NxbService.delete(id);
                    alert("Xóa nhà xuất bản thành công");
                }
                catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created(){
        this.retrieveNxb();
        this.loadTenNXB();
    }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>