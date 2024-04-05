<script>
import NvService from "@/services/nv.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    props: {
        MSNV: { type: String, required: true },
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data(){
        const userFormSchema = yup.object().shape({
            old_password: yup
                .string()
                .required("Tên đăng nhập không được bỏ trống.")
                .min(4, "Tên đăng nhập phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự."),
            new_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự."),
            confirm_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự.")
                .oneOf([yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp.'),
        });
        return{
            userFormSchema,
            data:{
                oldPassword:"",
                newPassword:""
            },
            message:"",
        }
    },
    methods: {
        async changePassword() {
            try {
                await NvService.changePassword(this.MSNV,this.data);
            }
            catch (error) {
                this.message = error.response.data.message;
            }
        }
    },
}
</script>
<style>
.error-feedback {
    color: red;
}
</style>
<template>
    <Form @submit="changePassword" :validation-schema="userFormSchema" style="max-width: 50%; margin: 20px auto; background: #EFF7FF;" class="p-3 border rounded border-primary">
        <div class="text-center my-4 fs-3 pb-2 text-primary border-bottom border-3 border-primary">Đổi mật khẩu</div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="old_password" class="col-sm-3 col-form-label fw-bold">Mật khẩu cũ:</label>
            <div class="col-sm-9">
                <Field name="old_password" type="password" class="form-control" v-model="data.oldPassword"/>
                <ErrorMessage name="old_password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="new_password" class="col-sm-3 col-form-label fw-bold">Mật khẩu mới:</label>
            <div class="col-sm-9">
                <Field name="new_password" type="password" class="form-control" v-model="data.newPassword"/>
                <ErrorMessage name="new_password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="confirm_password" class="col-sm-3 col-form-label fw-bold">Xác nhận mật khẩu mới:</label>
            <div class="col-sm-9">
                <Field name="confirm_password" type="password" class="form-control"/>
                <ErrorMessage name="confirm_password" class="error-feedback" />
            </div>
        </div>
        <p class="ms-4 error-feedback">{{ message }}</p>
        <div>
            <button type="submit" class="col btn btn-outline-primary ms-4 py-2">Xác nhận</button>
        </div>
    </Form>
</template>