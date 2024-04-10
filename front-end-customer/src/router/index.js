import { createWebHistory, createRouter } from "vue-router";
import HomeBook from "@/views/HomeBook.vue";

const routes = [
    {
        path: "/",
        name: "homeBook",
        component: HomeBook,
    },
    {
        path: "/rentList",
        name: "rentList",
        component: () => import("@/views/BookRent.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/docgia-info/:maDocGia",
        name: "docgia-info",
        component: () => import("@/views/DocGia.vue"),
        props: true
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;