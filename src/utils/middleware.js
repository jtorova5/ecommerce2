
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

const mdlwUserSession = (req,res,next) => {
    if (req.session.user) {
        return res.status(401).json({
            status: 'error',
            msg: 'Error, unauthorized user'
        })
    }
    next();
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

module.exports = {mdlwOnlyAdmin, ifUserExists, mdlwUserSession, adminPremiumPermission}