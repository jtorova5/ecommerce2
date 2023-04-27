
const {faker} = require('@faker-js/faker');

const get = async (req, res) => {
    try {
      const mockingProducts = generateMockingProducts(100);
      return res.send(mockingProducts);
    } catch (error) {
      console.log(error);
      return res.send({ status: 500, error: 'Error from server' });
    }
  }
  
  const generateMockingProducts = (quantity) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
      const product = {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        thumbnails: [faker.image.image(), faker.image.image()],
        status: true,
        code: faker.datatype.hexadecimal({ length: 5 }),
        stock: faker.datatype.number({ max: 100 }),
      };
      products.push(product);
    }
    return products;
  }
  
  module.exports = {
    get,
    generateMockingProducts,
  }