<template>
    <div style="margin: auto;width: 80%;" class="content p-5 rounded border border-3">
        <table class="table table-hover text-center p-2">
            <thead>
                <tr>
                    <th scope="col" colspan="2" class="text-center">Thông tin của bạn</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Mã đọc giả:</th>
                    <td>{{ user._id }}</td>
                </tr>
                <tr>
                    <th scope="row">Họ:</th>
                    <td>{{ user.hoLot }}</td>
                </tr>
                <tr>
                    <th scope="row">Tên:</th>
                    <td>{{ user.ten }}</td>
                </tr>
                <tr>
                    <th scope="row">Phái:</th>
                    <td>{{ user.phai }}</td>
                </tr>
                <tr>
                    <th scope="row">Địa Chỉ:</th>
                    <td>{{ user.diaChi }}</td>
                </tr>
                <tr>
                    <th scope="row">Số điện thoại:</th>
                    <td>{{ user.dienThoai }}</td>
                </tr>
            </tbody>
        </table>
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
                        <label for="ho" class="form-label">Họ</label>
                        <Field type="text" name="ho" class="form-control mb-3" v-model="changeInfo.hoLot" />
                        <ErrorMessage name="ho" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="ten" class="form-label">Tên</label>
                        <Field type="text" name="ten" class="form-control mb-3" v-model="changeInfo.ten" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <label for="phai" class="col-md fw-bold">Phái:</label>
                    <div class="col-sm">
                        <select name="phai" v-model="changeInfo.phai" class="form-select">
                            <option selected value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        <ErrorMessage name="phai" class="error-feedback" />
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
                        <Field type="text" name="sdt" class="form-control mb-3" v-model="changeInfo.dienThoai" />
                        <ErrorMessage name="sdt" class="error-feedback" />
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-primary mt-3" style="width: 30%;">Lưu</button>
        </Form>
    </div>
</template>
<style scoped>
.error-feedback {
    color: red;
}
</style>
<script>
import DocGiaService from "@/services/docgia.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        DocGiaService
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
            ho: yup
                .string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
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
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                )
        });
        return {
            user: {},
            changePassField: false,
            changeInfoField: false,
            userFormSchema,
            passwordFormSchema,
            userName: "",
            changePass: {
                oldPassword: "",
                password: "",
            },
            changeInfo: {
                hoLot: "",
                ten: "",
                phai: "",
                diaChi: "",
                dienThoai: "",
            },
            message: "",
        }
    },
    methods: {
        async getUserData() {
            try {
                this.user = await DocGiaService.get(sessionStorage.getItem("userName"));
            } catch (error) {
                console.log(error);
            }
        },
        ChangePassField() {
            this.changeInfoField = false;
            this.changePassField = !this.changePassField;
        },
        ChangeInfoField() {
            this.changeInfo.hoLot = this.user.holot;
            this.changeInfo.ten = this.user.ten;
            this.changeInfo.phai = this.user.phai;
            this.changeInfo.diaChi = this.user.diaChi;
            this.changeInfo.dienThoai = this.user.dienThoai;
            this.changePassField = false;
            this.changeInfoField = !this.changeInfoField;
        },
        async changePassword() {
            try {
                const result = await DocGiaService.update(this.userName, this.changePass);
                this.message = "Cập nhật mật khẩu thành công!";
                this.changePassField = false;
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
        async changeUserInfo() {
            try {
                const result = await DocGiaService.update(this.userName, this.changeInfo);
                this.message = result.message;
                this.getUserData();
                this.changeInfoField = false;
            } catch (error) {
                console.log(error);
                this.message = error.response.data.message;
            }
        },
    },
    mounted() {
        this.userName = sessionStorage.getItem("userName");
        this.getUserData();
    }
}
</script>