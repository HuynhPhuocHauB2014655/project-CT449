const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const MuonSachService = require("../services/theodoimuonsach.service");
const BookService = require("../services/book.service");
const DocGiaService = require("../services/docgia.service");
exports.create = async (req, res, next) => {
    const muonSachService = new MuonSachService(MongoDB.client);
    const docGiaService = new DocGiaService(MongoDB.client);
    try {
        const docgia = await docGiaService.findById(req.body.maDocGia);
        if(!docgia)
        {
            return next(
                new ApiError(405, "Ma sach hoac ma doc gia khong ton tai.")
            );
        }
        const document = await muonSachService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Loi khi tao theo doi muon sach.")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const { filter } = req.query;
        if (filter) {
            documents = await muonSachService.findByName(filter);
        } else {
            documents = await muonSachService.find({});
        }
        return res.send(documents);
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving nxb")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const document = await muonSachService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Co loi khi tim kiem id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const bookService = new BookService(MongoDB.client);
        const docGiaService = new DocGiaService(MongoDB.client);
        const book = await bookService.findById(req.body.maSach);
        const docgia = await docGiaService.findById(req.body.maDocGia);
        if(!book || !docgia)
        {
            return next(
                new ApiError(405, "Ma sach hoac ma doc gia khong ton tai.")
            );
        }
        const document = await muonSachService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, 'not found'));
        }
        return res.send({message: "Da cap nhat thanh cong"});
    } catch (error) {
        return next (
            new ApiError(500, `Co loi khi cap nhat id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const document = await muonSachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Not found'));
        }
        return res.send({message: "Da xoa thanh cong"});
    } catch (error) {
        return next(new ApiError(500, `Co loi khi xoa id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const deleteCount = await muonSachService.deleteAll();
        return res.send({
            message : `${deleteCount} da xoa.`
        });
    } catch (error) {
        return next (
            new ApiError(500, "CO loi khi xoa.")
        );
    }
};
