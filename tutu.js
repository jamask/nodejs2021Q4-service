const supertest = require('supertest');
const request = supertest('localhost:4000');

const TEST_USER_DATA = {
  "name": "TEST_USER",
  "login": "test_user",
  "password": "T35t_P@55w0rd"
};

(async () => {
  await request
        .post('/users')
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(201)
})()