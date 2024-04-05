import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/book/find")).data;
    }
    async create(data) {
        return (await this.api.post("/admin/book", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/admin/book")).data;
    }
    async get(id) {
        return (await this.api.get(`/book/find/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/admin/book/${id}`, data)).data;

    }
    async delete(id) {
        return (await this.api.delete(`/admin/book/${id}`)).data;
    }
}
export default new BookService()