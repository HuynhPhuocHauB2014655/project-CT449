<script>
import NvService from "@/services/nv.service.js";
export default {
    props: {
        MSNV: { type: String, required: true },
    },
    data() {
        return {
            nv: [],
        }
    },
    methods: {
        async getNv() {
            try {
                this.nv = await NvService.get(this.MSNV);
                console.log(this.nv);
            }
            catch (error) {
                console.log(error);
            }
        }
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
            <router-link :to="{name: 'change-password', params: { MSNV: nv._id }}">
                <button class="btn btn-sm btn-outline-primary me-2">Đổi mật khẩu</button>
            </router-link>
        </div>
    </div>
</template>