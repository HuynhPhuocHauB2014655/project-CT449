import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async update(id,data) {
        return (await this.api.put(`/admin/book/${id}`,data)).data;
    }
    async getAll() {
        return (await this.api.get("/book/find")).data;
    }
    async get(id) {
        return (await this.api.get(`/book/find/${id}`)).data;
    }
}
export default new BookService()