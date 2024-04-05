import createApiClient from "./api.service";
class NxbService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/nxb/find")).data;
    }
    async create(data) {
        return (await this.api.post("/admin/nxb", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/admin/nxb")).data;
    }
    async get(id) {
        return (await this.api.get(`/nxb/find/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/admin/nxb/${id}`, data)).data;

    }
    async delete(id) {
        return (await this.api.delete(`/admin/nxb/${id}`)).data;
    }
}
export default new NxbService()