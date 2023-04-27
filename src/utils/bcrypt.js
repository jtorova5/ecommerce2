
const bcrypt = require ('bcrypt');

const hashPassword = async (password) => bcrypt.hashSync (password, bcrypt.genSaltSync(10)); 

const comparePassword = async (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {hashPassword, comparePassword}