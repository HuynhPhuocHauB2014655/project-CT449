<template>
    <Form class="row border border-2 rounded px-3" @submit="submitnxb" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="id">Mã NXB:</label>
            <Field v-if="!nxb._id" name="id" type="text" class="form-control" v-model="nxb.maNxb" />
            <Field v-else name="id" type="text" class="form-control" v-model="nxb._id" disabled/>
            <ErrorMessage name="id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name">Tên NXB:</label>
            <Field name="name" type="text" class="form-control" v-model="nxb.tenNxb" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ:</label>
            <Field name="diachi" type="text" class="form-control" v-model="nxb.diaChi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group my-2">
            <button class="btn btn-primary"><i class="fa-solid fa-book"></i> Lưu</button>
            <button v-if="type == 'edit'" type="button" class="ml-2 btn btn-danger" @click="deleteNxb">
                <i class="fas fa-trash"></i> Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:nxb", "delete:mxb"],
    props: {
        nxb:{ type: Object, required: true },
        type: { type: String, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            id: yup
                .string()
                .required("Mã NXB không được bỏ trống.")
                .min(2, "Mã NXB phải có ít nhất 2 ký tự.")
                .max(10, "Mã NXB có nhiều nhất 10 ký tự."),
            name: yup
                .string()
                .required("Tên NXB không được bỏ trống.")
                .min(2, "Tên NXB phải ít nhất 2 ký tự.")
                .max(50, "Tên NXB có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống.")
                .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
                .max(300, "Địa chỉ có nhiều nhất 300 ký tự."),
        });
        return {
            contactFormSchema
        };
    },
    methods: {
        submitnxb() {
            this.$emit("submit:nxb", this.nxb);
        },
        deleteNxb() {
            this.$emit("delete:nxb", this.nxb._id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>