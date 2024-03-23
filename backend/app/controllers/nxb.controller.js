const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const NxbService = require("../services/Nxb_service");

exports.create = async (req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.create(req.body);
        
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the nxb")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nxbService = new NxbService(MongoDB.client);
        const { tenNxb } = req.query;
        if (tenNxb) {
            documents = await nxbService.findByName(tenNxb);
        } else {
            documents = await nxbService.find({});
        }
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving nxb")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"nxb not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving nxb with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, 'nxb not found'));
        }
        return res.send({message: "nxb was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500, `Error updating nxb with id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'nxb not found'));
        }
        return res.send({message: "nxb was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete nxb with id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const deleteCount = await nxbService.deleteAll();
        return res.send({
            message : `${deleteCount} nxb were deleted`
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all nxb")
        );
    }
};
