<template>
    <nav class="navbar px-3 bg-info row">
        <div class="col-md-4 d-flex">
            <a href="/" class="navbar-brand">Book Land</a>
            <ul v-if="getUserName" class="nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'rentList' }" class="nav-link text-dark">
                        Danh sách mượn
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md">
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
                    <router-link :to="{ name: 'docgia-info', params: { maDocGia: getUserName } }" class="nav-link text-dark">
                        Thông tin
                    </router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-dark" @click="logout">Đăng xuất</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
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
                sessionStorage.removeItem("userName");
                this.userName = "";
                window.location.reload();
            }
        }
    },
    mounted() {
        this.getUserName;
        if (!this.userName) {
            this.$router.push({ name: "login" });
        }
    }
};
</script>