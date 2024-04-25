<template>
    <div>
        <div style="width: 60%;" class="mx-auto mt-5">
            <h4 class="text-center mb-2">Chỉnh sửa Nhà Xuất Bản </h4>
            <h5 class="text-center  text-danger">{{ message }}</h5>
            <NXBForm :nxb="nxb" :type="type" @submit:nxb="updateNxb" @delete:nxb="updateNxb" />
        </div>
    </div>
</template>

<script>
import NXBForm from "@/components/NxbForm.vue";
import NxbService from "@/services/nxb.service.js";

export default {
    components: {
        NXBForm
    },
    props: {
        id:{ type: String, required: true },
    },
    data() {
        return {
            nxb: [],
            type: "edit",
            message:"",
        };

    },
    methods: {
        async getNXB(id) {
            try {
                this.nxb = await NxbService.get(id);
            } catch (error) {
                console.log(error);

                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$router.path.split("/").slice(1)
                    },
                    query: this.$router.query,
                    hash: this.$router.hash,
                });
            }
        },

        async updateNxb(data) {
            try {
                await NxbService.update(this.nxb._id, data);
                alert("Chỉnh sửa nhà xuất bản thành công");
                this.$router.push({ name: 'nxbview' });
            } catch (error) {
                this.message = error.response.data.message;
            }
        },

        async deleteBook() {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await NxbService.delete(this.book._id);
                    alert("Xóa nhà xuất bản thành công");
                    this.$router.push({ name: 'nxbview' });
                } catch (error) {
                    this.message = error.response.data.message;
                }
            }
        },
    },
    created() {
        this.getNXB(this.id)
    },
};
</script>