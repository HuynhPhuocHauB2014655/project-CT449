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
    async getAll(){
        return (await this.api.get('/muonsach/find')).data;
    }
    async update(id, data) {
        return await this.api.put(`/muonsach/${id}`, data).data;
    }
    async delete(id) {
        return await this.api.delete(`/muonsach/${id}`);
    }
    async deleteAll(){
        return await this.api.delete('/muonsach');
    }
}
export default new RentBookService()