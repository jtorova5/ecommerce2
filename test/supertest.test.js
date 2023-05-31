
const chai = require('chai');
const superTest = require('supertest');
const testingURL = 'http://localhost:8080';
const request = superTest(testingURL);
const expect = chai.expect;
const testingProducts = ['63e7a12bf134806719ebc91f'];

// Testing de Session
describe('Test de sesiones ', () => {
  const user = {
    first_name: 'Admin',
    last_name: 'Coder',
    email: 'adminCoder@coder.com',
    age: '20',
    password: '123456',
    role: 'admin',
  };

  let cookie;

  it(`Testing de registro - ${testingURL}/api/session/register`, async () => {
    const response = await request.post(`/api/session/register`).send(user);
    const { statusCode, _body, ok } = response;
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body);
  }).timeout(10000);

  it(`Testing de inicio de sesion - ${testingURL}/api/session/login`, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: user.email,
      password: user.password,
    });
    const { statusCode, headers } = response;
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    expect(statusCode).to.deep.equal(200);
    expect(headers['set-cookie']).to.be.ok;
    expect(cookie.name).to.equal('connect.sid');
  });

  it(`Current Usuario - ${testingURL}/api/session/current`, async () => {
    const response = await request.get(`/api/session/current`).set('Cookie', `${cookie.name}=${cookie.value}`);
    const { statusCode } = response;
    expect(statusCode).to.deep.equal(200);
  });
});

//Testing de productos
describe('Test de productos', () => {
  const product = {
    title: 'Testing product',
    description: 'Descripcion de prueba para testing',
    code: 'PRTS1',
    price: 50000,
    status: 'true',
    stock: 200,
    category: 'testing',
    thumbnails: ['...links'],
  };

  it(`Testing de obtención de todos los productos - ${testingURL}/products`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd/${testingProducts[0]}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Testing de creacion de un producto - ${testingURL}/api/products/`, async () => {
    const { statusCode, ok, _body } = await request.post(`/api/productsBd/`).send(product);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });
});

//Testing de carrito
describe('Test de carritos ', () => {
  let id = ['6441d5af3c64302245139d70'];
  it(`Testing de obtencion de carritos - ${testingURL}/api/cartsBd/`, async () => {
    const { statusCode, ok, _body } = await request.get('/api/cartsBd');
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de carrito por ID - ${testingURL}/api/cartsBd/:cid `, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/cartsBd/${id}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Testing de adicion de producto a un carrito por ID - ${testingURL}/api/cartsBd/:cid/product/:pid `, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: 'gonza@gmail.com',
      password: '12345678',
    });
    const { headers } = response;
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    const { statusCode, ok, _body } = await request.post(`/api/cartsBd/${id}/product/${testingProducts[0]}`).set('Cookie', `${cookie.name}=${cookie.value}`);
    expect(statusCode).to.deep.equal(201);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  })
})