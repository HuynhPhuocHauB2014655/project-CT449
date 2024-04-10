import createApiClient from "./api.service";
class NxbService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/nxb/find")).data;
    }

    async get(id) {
        return (await this.api.get(`/nxb/find/${id}`)).data;
    }
}
export default new NxbService()