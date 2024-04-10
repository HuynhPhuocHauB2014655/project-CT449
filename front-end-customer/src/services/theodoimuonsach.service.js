import createApiClient from "./api.service";
class RentBookService {
    constructor(baseUrl = "/api/books/") {
        this.api = createApiClient(baseUrl);
    }
    async create(data){
        return (await this.api.post("/muonsach",data)).data;
    }
    async get(id) {
        return (await this.api.get(`/muonsach/find/${id}`)).data;
    }
}
export default new RentBookService()