const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const DocGiaService = require("../services/docgia.service");
const CryptoJS = require('crypto-js');
exports.create = async (req, res,next) => {
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const isexits = await docGiaService.findById(req.body.maDocGia);
        if (isexits != null) return next (new ApiError(409,'Mã đọc giả đã tồn tại'));
        const document = await docGiaService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Loi khi tao moi doc gia")
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        if(req.body.oldPassword)
        {
            const password = await docGiaService.decryptPassword(req.params.id);

            if(req.body.oldPassword != password)
            {
                return next(new ApiError(400, 'Mật khẩu không đúng'));
            }
        }
        const document = await docGiaService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, 'Doc gia khong ton tai'));
        }
        return res.send({message: "Doc gia da duoc cap nhat thanh cong"});
    } catch (error) {
        return next (
            new ApiError(500, `Co loi khi cap nhat doc gia id=${req.params.id}` )
        );
    }
};
exports.login = async(req,res,next) => {
    try
    {
        const docGiaService = new DocGiaService(MongoDB.client);
        const docgia = await docGiaService.findById(req.body.maDocGia);
        if(!docgia)
        {
            return next(new ApiError(404, 'Ma doc gia khong dung!'));
        }
        else{
            const decryptedPassword = CryptoJS.AES.decrypt(docgia.password, "Bookrentstore", { iv: "BookrentstoreIV" }).toString(CryptoJS.enc.Utf8);
            if(decryptedPassword === req.body.password)
            {
                return res.send(docgia._id);
            }
            else
            {
                return next(new ApiError(404, 'Mat khau khong dung!'));
            }
        }
    }
    catch(error)
    {
        return next (
            new ApiError(500, "Co loi khi dang nhap!" )
        );
    }
}
exports.find = async (req,res,next) => {
    const docGiaService = new DocGiaService(MongoDB.client);
    try{
        let docs =  await docGiaService.find();
        return res.send(docs);
    }catch(error){
        return next(new ApiError(500,"Lay danh sach doc Gia that bai"));
    }
}
exports.findById = async (req,res,next) => {
    const docGiaService = new DocGiaService(MongoDB.client);
    try
    {
        const docgia = await docGiaService.findById(req.params.id);
        if(!docgia)
        {
            return next (
                new ApiError(405, "Doc gia khong ton tai." )
            );
        }
        else
        {
            return res.send(docgia);
        }
    }
    catch(error)
    {
        return next (
            new ApiError(502, "Co loi khi tim kiem doc gia." )
        );
    }
} 
