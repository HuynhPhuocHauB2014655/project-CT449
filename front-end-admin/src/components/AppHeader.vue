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
            <ul v-if="!mainUser.userName" class="nav d-flex justify-content-end">
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
                    <router-link :to="{ name: 'nv-info', params: { MSNV: mainUser.userName } }" class="nav-link text-dark">
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
import {useUser} from  "@/stores/main.vue";
export default{
        setup(){
            const mainUser = useUser();
            return {mainUser};
        },
        methods:{
            logout()
            {
                if(confirm('Bạn có chắc muốn đăng xuất không?'))
                {
                    this.mainUser.logOut();
                }
            }
        },
    };
</script>