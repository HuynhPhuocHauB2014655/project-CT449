import createApiClient from "./api.service";
class NvService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/nv", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/nv/find/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/nv/${id}`, data)).data;

    }
    async login(data) {
        return (await this.api.post(`/nv/login`, data)).data;
    }

}
export default new NvService()