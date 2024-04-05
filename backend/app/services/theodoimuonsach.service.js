const crypto = require('crypto');
class MuonSachService{
    constructor(client) {
        this.Data= client.db().collection("TheoDoiMuonSach");
    }
    extractData(payload){
        const data = {
            _id: crypto.randomBytes(10).toString('hex'),
            maDocGia:payload.maDocGia,
            maSach: payload.maSach,
            ngayMuon: payload.ngayMuon,
            ngayTra: Date(payload.ngayTra)
        }
        Object.keys(data).forEach(
            (key) => data[key] === undefined && delete data[key]
        );
        return data;
    }
    async create(payload) {
        const data = this.extractData(payload);
        const result = await this.Data.insertOne(
            data,
            { returnDocument: "after", upsert: true },
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Data.find(filter);
            return await cursor.toArray();
        }

    async findByName(tenNxb) {
        return await this.Data.find({
            tensach: { $regex: new RegExp(tenNxb), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Data.findOne({
            _id: id
        });
    }
    async update(id, payload) {
        const filter = {
            _id: id,
        };
        const update = this.extractData(payload);
        const result = await this.Data.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Data.findOneAndDelete({
            _id: id,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Data.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = MuonSachService;