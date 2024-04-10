import createApiClient from "./api.service";
class DocGiaService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async create(data){
        return (await this.api.post("/docgia",data)).data;
    }
    async update(id,data){
        return (await this.api.put(`docgia/${id}`,data)).data;
    }
    async login(data){
        return (await this.api.post('docgia/login', data)).data;
    }
    // async getAll() {
    //     return (await this.api.get("/book/find")).data;
    // }
    async get(id) {
        return (await this.api.get(`/docgia/find/${id}`)).data;
    }
}
export default new DocGiaService()