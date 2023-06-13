
const BdProductManager = require('../dao/mongoManager/dbProductManager');

const mdlwOnlyAdmin = (req,res,next) => {
    if (req.session.user.role !== 'admin') {
        return res.status(401).json({
            status: 'error',
            msg: 'Error, unauthorized user'
        })
    }
    next();
}

const ifUserExists = (req, res, next) => {
    const user = req.session.user
    if (!user) {
        return res.status(401).json({
            status: 'error',
            msg: 'Only logged in users can use the chat'
        });
    }
    next();
}

const mdlwUserSession = (req, res, next) => {
    if (!req.user || req.user?.role !== 'user') {
        return res.status(401).json({
            status: 'error',
            msg: 'Error, unauthorized user',
        });
    }
    next();
}

const premiumDocs = async (req,res,next) => {
    if (req.user.documents) {
        const docs = req.user.documents
        const files = docs.map(File)
        console.log(files);
        res.status(200).json({files});
    }
}

const adminPremiumPermission = async (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'premium') {
        return res.status(401).json({
            status: 'error',
            msg: 'Error, unauthorized user',
        });
    }
    next();
}

module.exports = {mdlwOnlyAdmin, ifUserExists, mdlwUserSession, adminPremiumPermission, premiumDocs}