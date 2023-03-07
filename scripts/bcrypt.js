
const bcrypt = require ('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt (10);
    console.log (salt);
    const hash = bcrypt.hashSync (password, salt); 
    console.log ({hash,salt});
}

const comparePassword = async (password, hash) => {
    const response = bcrypt.compareSync(password, hash);
    console.log(response);
}

comparePassword ('123456', '$2b$10$Il3jqfQeH.cIjmbzNnbmJe/TiTZMeEdw4Of7kpLrs5axJRjl/I8ym');