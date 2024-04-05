import { createWebHistory, createRouter } from "vue-router";
import HomeBook from "@/views/HomeBook.vue";
import NXBView from "@/views/NXBView.vue";

const routes = [
    {
        path: "/",
        name: "homeBook",
        component: HomeBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/edit-book/:id",
        name: "book-edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true
    },
    {
        path: "/add-book",
        name: "book-add",
        component: () => import("@/views/BookAdd.vue"),
    },
    {
        path: "/nxb",
        name: "nxbview",
        component: NXBView,
    },
    {
        path: "/add-nxb/",
        name: "nxb-add",
        component: () => import("@/views/NXBAdd.vue"),
    },
    {
        path: "/edit-nxb/:id",
        name: "nxb-edit",
        component: () => import("@/views/NXBEdit.vue"),
        props: true
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
        path: "/nv-info/:MSNV",
        name: "nv-info",
        component: () => import("@/views/NV_Info.vue"),
        props: true
    },
    {
        path: "/password/:MSNV",
        name: "change-password",
        component: () => import("@/views/changePassword.vue"),
        props: true
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;