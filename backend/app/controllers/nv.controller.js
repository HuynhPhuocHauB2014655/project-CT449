const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const NhanVienService = require("../services/nhanvien.service");
const CryptoJS = require('crypto-js');
exports.create = async (req, res,next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const isexits = await nhanVienService.findById(req.body.MSNV);
        if (isexits != null) return next (new ApiError(409,'Tài khoản đã tồn tại'));
        const document = await nhanVienService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the Nhan Vien")
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        if(req.body.oldPassword)
        {
            const password = await nhanVienService.decryptPassword(req.params.id);

            if(req.body.oldPassword != password)
            {
                return next(new ApiError(400, 'Mật khẩu không đúng'));
            }
        }
        const document = await nhanVienService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, 'Nhan vien not found'));
        }
        return res.send({message: "Nhan vien was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating Nhan vien with id=${req.params.id}` )
        );
    }
};
exports.login = async(req,res,next) => {
    try
    {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const NV = await nhanVienService.findById(req.body.MSNV);

        if(!NV)
        {
            return next(new ApiError(404, 'MSNV không đúng!'));
        }
        else{
            const decryptedPassword = CryptoJS.AES.decrypt(NV.password, "Bookrentstore", { iv: "BookrentstoreIV" }).toString(CryptoJS.enc.Utf8);
            if(decryptedPassword === req.body.password)
            {
                return res.send(NV._id);
            }
            else
            {
                return next(new ApiError(404, 'Mật khẩu không đúng!'));
            }
        }
    }
    catch(error)
    {
        return next (
            new ApiError(500, "Error when login!" )
        );
    }
}
exports.findById = async (req,res,next) => {
    const nhanVienService = new NhanVienService(MongoDB.client);
    try
    {
        const nv = await nhanVienService.findById(req.params.id);
        if(!nv)
        {
            return next (
                new ApiError(405, "Nhan vien khong ton tai." )
            );
        }
        else
        {
            return res.send(nv);
        }
    }
    catch(error)
    {
        return next (
            new ApiError(502, "Co loi khi tim kiem nhan vien." )
        );
    }
} 
