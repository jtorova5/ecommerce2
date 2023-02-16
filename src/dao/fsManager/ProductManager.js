
const fs = require("fs");

const writeFile = (path, Products) =>
  fs.promises.writeFile(path, JSON.stringify({ products: Products }));

const readFile = async (path) => {
  const GetProducts = await fs.promises.readFile(path);
  const Result = JSON.parse(GetProducts);
  return Result;
};

class ProductManager {
  constructor(path) {
    this.Product = [];
    this.path = path;
  }
  
  CreateFile = async () => {
    const File = fs.existsSync(this.path);
    if (File) {
      const { products } = await readFile(this.path);
      this.Product = products;
    } else {
      await writeFile(this.path, this.Product);
    }
  };

  getProducts = async (limit) => {
    const { products } = await readFile(this.path);
    if (!limit) {
      return products;
    } else {
      const arrayFiltrado = products.slice(0, limit);
      return arrayFiltrado;
    }
  };

  addProduct = async (pro) => {
    if (pro.title || pro.description || pro.code || pro.price || pro.status || pro.stock || pro.category) {
      const { products } = await readFile(this.path);
      this.Product = products;
      this.Product.push({
        id: this.Product.length,
        ...pro,
      });
      await writeFile(this.path, this.Product);
      return { msg: "Product added" };
    } else {
      return { msg: "There are some fields missing" };
    }
  };

  getProductById = async (id) => {
    const { products } = await readFile(this.path);
    const ProductId = products.find((product) => product.id === parseInt(id));
    if (ProductId) {
      return ProductId;
    } else {
      return { msg: "Product not found" };
    }
  }

  updateProduct = async (id, body) => {
    const { products } = await readFile(this.path);
    this.Product = products;
    const updateProduct = this.Product.findIndex(
      (element) => element.id === id
    );
    console.log(updateProduct);

    if (updateProduct !== -1) {
      const id = this.Product[updateProduct].id;
      this.Product[updateProduct] = {
        id,
        ...body,
      };
      await writeFile(this.path, this.Product);
      return "Product updated";
    } else {
      return { msg: "Product to update wasn't found" };
    }
  };

  deleteProduct = async (id) => {
    const { products } = await readFile(this.path);
    this.Product = products;
    const FindIndex = this.Product.findIndex(
      (element) => element.id === parseInt(id))
    if (FindIndex !== -1) {
      const newArrayProducts = this.Product.filter(
        (product) => product.id !== parseInt(id));
      await writeFile(this.path, newArrayProducts);
      return { msg: "Product deleted" };
    } else {
      return { msg: "Product to delete wasn't found" };
    }
  }
}

module.exports = ProductManager;