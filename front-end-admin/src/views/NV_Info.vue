<script>
import NvService from "@/services/nv.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    props: {
        MSNV: { type: String, required: true },
    },
    components:{
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const passwordFormSchema = yup.object().shape({
            old_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự."),
            new_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự."),
            confirm_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .oneOf([yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp.'),
        });
        const userFormSchema = yup.object().shape({
            chucvu: yup
                .string()
                .required("Chức vụ không được bỏ trống.")
                .min(2,"Chức vụ phải ít nhất 2 ký tự.")
                .max(50, "Chức vụ có nhiều nhất 50 ký tự."),
            ten: yup
                .string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            sdt: yup
                .string()
                .required("Số điện thoại không được bỏ trống.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                )
        });
        return {
            nv: [],
            changePassField: false,
            changeInfoField: false,
            userFormSchema,
            passwordFormSchema,
            changePass: {
                oldPassword: "",
                password: "",
            },
            changeInfo: {
                hovatenNV: "",
                chucVu: "",
                diaChi: "",
                sdt: "",
            },
        }
    },
    methods: {
        async getNv() {
            try {
                this.nv = await NvService.get(this.MSNV);
            }
            catch (error) {
                console.log(error);
            }
        },
        ChangePassField() {
            this.changeInfoField = false;
            this.changePassField = !this.changePassField;
        },
        ChangeInfoField() {
            this.changeInfo.hovatenNV = this.nv.hovatenNV;
            this.changeInfo.diaChi = this.nv.diaChi;
            this.changeInfo.sdt = this.nv.sdt;
            this.changeInfo.chucVu = this.nv.chucVu;
            this.changePassField = false;
            this.changeInfoField = !this.changeInfoField;
        },
        async changePassword() {
            try {
                await NvService.update(this.nv._id, this.changePass);
                this.message = "Cập nhật mật khẩu thành công!";
                this.changePassField = false;
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
        async changeUserInfo() {
            try {
                const result = await NvService.update(this.nv._id, this.changeInfo);
                this.message = result.message;
                this.getNv();
                this.changeInfoField = false;
            } catch (error) {
                console.log(error);
                this.message = error.response.data.message;
            }
        },
    },
    created() {
        this.getNv();
    }
}
</script>

<template>
    <div style="width: 70%; margin: auto;">
        <h3>Thông tin nhân viên</h3>
        <div v-if="nv">
            <table class="table table-hover p-2 fs-5 mt-3">
                <tbody>
                    <tr>
                        <td scope="col">Mã số nhân viên: </td>
                        <td>{{ nv._id }}</td>
                    </tr>
                    <tr>
                        <td scope="col">Họ tên: </td>
                        <td>{{ nv.hovatenNV }}</td>
                    </tr>
                    <tr>
                        <td scope="col">Chức vụ: </td>
                        <td>{{ nv.chucVu }}</td>
                    </tr>
                    <tr>
                        <td scope="col">Địa chỉ: </td>
                        <td>{{ nv.diaChi }}</td>
                    </tr>
                    <tr>
                        <td scope="col">Số điện thoại: </td>
                        <td>{{ nv.sdt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex">
            <button class="btn btn-sm btn-primary me-2" @click="ChangePassField()">Đổi mật khẩu</button>
            <button class="btn btn-sm btn-success" @click="ChangeInfoField()">Chỉnh sửa thông tin</button>
        </div>
        <p>{{ message }}</p>
        <Form @submit="changePassword" :validation-schema="passwordFormSchema" v-if="changePassField"
            class="mt-3 border rounded border-3 p-2" style="background: #FBF6E5;">
            <h5 class="text-center">Đổi mật khẩu</h5>
            <div class="row">
                <div class="col-md">
                    <label for="old_password" class="form-label">Mật khẩu cũ</label>
                    <Field type="password" name="old_password" class="form-control mb-3"
                        placeholder="Nhập mật khẩu hiện tại" v-model="changePass.oldPassword" />
                    <ErrorMessage name="old_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="new_password" class="form-label">Mật khẩu mới</label>
                    <Field type="password" name="new_password" class="form-control mb-3" placeholder="Nhập mật khẩu mới"
                        v-model="changePass.password" />
                    <ErrorMessage name="new_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="confirm_password" class="form-label">Xác nhận mật khẩu mới</label>
                    <Field type="password" name="confirm_password" class="form-control mb-3"
                        placeholder="Nhập lại mật khẩu mới" />
                    <ErrorMessage name="confirm_password" class="error-feedback" />
                </div>
            </div>
            <button class="btn btn-sm btn-outline-primary" style="width: 30%;">Lưu</button>
        </Form>
        <Form @submit="changeUserInfo()" :validation-schema="userFormSchema" v-if="changeInfoField"
            class="mt-3 border rounded border-3 p-2" style="background: #FBF6E5;">
            <h5 class="text-center">Chỉnh sửa thông tin</h5>
            <div class="row">
                <div class="col-md">
                    <div class="col-md">
                        <label for="ten" class="form-label">Họ</label>
                        <Field type="text" name="ten" class="form-control mb-3" v-model="changeInfo.hovatenNV" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="chucvu" class="form-label">Chức vụ</label>
                        <Field type="text" name="chucvu" class="form-control mb-3" v-model="changeInfo.chucVu" />
                        <ErrorMessage name="chucvu" class="error-feedback" />
                    </div>
                </div>
                <div class="col-md">
                    <div class="col-md">
                        <label for="diachi" class="form-label">Địa chỉ</label>
                        <Field type="text" name="diachi" class="form-control mb-3" v-model="changeInfo.diaChi" />
                        <ErrorMessage name="diachi" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="sdt" class="form-label">Số điện thoại</label>
                        <Field type="text" name="sdt" class="form-control mb-3" v-model="changeInfo.sdt" />
                        <ErrorMessage name="sdt" class="error-feedback" />
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-primary mt-3" style="width: 30%;">Lưu</button>
        </Form>
    </div>
</template>