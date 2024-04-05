<template>
    <div v-if="this.success" style="width: 50%; margin: 20px auto;" class="text-center border border-4 border-success">
        <p class="fs-4 pt-3 text-success">{{ message }}</p>
        <router-link :to="{path:'/login'}" class="btn btn-outline-success mb-2">Đăng Nhập</router-link>
    </div>
    <Form v-else @submit="register" :validation-schema="userFormSchema" style="max-width: 50%; margin: 20px auto; background: #EFF7FF;" class="p-3 border rounded border-primary">
        <div class="text-center my-4 fs-3 pb-2 text-primary border-bottom border-3 border-primary">Đăng ký</div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="username" class="col-sm-3 col-form-label fw-bold">Tên đăng nhập:</label>
            <div class="col-sm-9">
                <Field name="username" type="text" class="form-control" v-model="User.MSNV"/>
                <ErrorMessage name="username" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="password" class="col-sm-3 col-form-label fw-bold">Mật khẩu:</label>
            <div class="col-sm-9">
                <Field name="password" type="password" class="form-control" v-model="User.password"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="confirm_password" class="col-sm-3 col-form-label fw-bold">Nhập lại mật khẩu:</label>
            <div class="col-sm-9">
                <Field name="confirm_password" type="password" class="form-control"/>
                <ErrorMessage name="confirm_password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="name" class="col-sm-3 col-form-label fw-bold">Họ và tên:</label>
            <div class="col-sm-9">
                <Field name="name" type="text" class="form-control" v-model="User.hovatenNV"/>
                <ErrorMessage name="name" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="chucvu" class="col-sm-3 col-form-label fw-bold">Chức vụ:</label>
            <div class="col-sm-9">
                <Field name="chucvu" type="text" class="form-control" v-model="User.chucVu"/>
                <ErrorMessage name="chucvu" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="diachi" class="col-sm-3 col-form-label fw-bold">Địa chỉ:</label>
            <div class="col-sm-9">
                <Field name="diachi" type="tel" class="form-control" v-model="User.diaChi"/>
                <ErrorMessage name="diachi" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="phone" class="col-sm-3 col-form-label fw-bold">Số điện thoại:</label>
            <div class="col-sm-9">
                <Field name="phone" type="tel" class="form-control" v-model="User.sdt"/>
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
        </div>
        <p v-if="!this.success" class="ms-4 error-feedback">{{ message }}</p>
        <div>
            <button type="submit" class="col btn btn-outline-primary ms-4 py-2">Đăng ký</button>
            <span class="ms-3">Bạn đã có tài khoản? <router-link :to="{name: 'login'}">Đăng Nhập</router-link></span>
        </div>
    </Form>
</template>
<style scoped>
    body{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .error-feedback {
        color: red;
    }
</style>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NvService from "@/services/nv.service";
import {useUser} from "@/stores/main.vue";
export default {
    setup(){
        const mainUser = useUser();
        return {mainUser};
    },
    components: {
        Form,
        Field,
        ErrorMessage,
        NvService
    },
    data() {
        const userFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên đăng nhập không được bỏ trống.")
                .min(4, "Tên đăng nhập phải ít nhất 4 ký tự.")
                .max(30,"Tên đăng nhập không quá 30 kí tự."),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự."),
            confirm_password: yup
                .string()
                .required("Mật khẩu xác nhận không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20,"Mật khẩu tối đa 20 ký tự.")
                .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.'),
            name: yup
                .string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            chucvu: yup
                .string()
                .required("Chức vụ không được bỏ trống.")
                .min(2, "Chức vụ phải ít nhất 2 ký tự.")
                .max(50, "Chức vụ có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
            )
        });
        return {
            User: {
                MSNV: "",
                password: "",
                hovatenNV:"",
                chucVu:"",
                diaChi:"",
                sdt:"",
            },
            userFormSchema,
            message: '',
            success:false,
        };
    },
    methods:{
        async register(){
            try {
                    const result = await NvService.create(this.User);
                    this.success = true;
                    this.message = "Đã đăng ký thành công!";
                } catch (error) {
                    this.message = error.response.data.message;
                }
        },
    }
}
</script>