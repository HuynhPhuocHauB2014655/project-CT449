<template>
    <div class="navbar navbar-expand px-3 bg-info row">
        <div class="col-sm-2"><a href="/" class="navbar-brand">Ứng dụng Quản lý mượn sách</a></div>
        <div class="col-sm">
            <ul class="nav ms-5">
                <li class="nav-item">
                    <router-link :to="{ name: 'homeBook' }" class="nav-link text-dark">
                        Danh sách Book
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'nxbview' }" class="nav-link text-dark">
                        Nhà Xuất Bản
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-sm">
            <ul v-if="!getUserName" class="nav d-flex justify-content-end">
                <li class="nav-item">
                    <router-link :to="{ name: 'register' }" class="nav-link text-dark">
                        Đăng ký
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'login' }" class="nav-link text-dark">
                        Đăng nhập
                    </router-link>
                </li>
            </ul>
            <ul v-else class="nav d-flex justify-content-end">
                <li class="nav-item">
                    <router-link :to="{ name: 'nv-info', params: { MSNV: getUserName } }" class="nav-link text-dark">
                        Thông tin
                    </router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark" @click="logout">Đăng xuất</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="#">Giỏ hàng</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            userName: '',
        }
    },
    computed: {
        getUserName() {
            this.userName = sessionStorage.getItem('userName');
            return this.userName;
        }
    },
    methods: {
        logout() {
            if (confirm('Bạn có chắc muốn đăng xuất không?')) {
                sessionStorage.setItem("userName","");
                this.userName = "";
                window.location.reload();
            }
        }
    },
    mounted(){
        if(!this.userName)
        {
            this.$router.push({name: "homeBook"});
        }
    }
};
</script>