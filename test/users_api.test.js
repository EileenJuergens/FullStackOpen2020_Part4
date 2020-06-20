// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const app = require('../app');
// const User = require('../models/user');
// const helper = require('./test_helper');

// // const api = supertest(app);


// beforeEach(async () => {
//   await User.deleteMany({});

//   const userObj = helper.initialUsers.map((user) => new User(user));
//   const promiseArr = userObj.map((user) => user.save());

//   await Promise.all(promiseArr);
// });

// describe('addition of a new user', () => {
//   // test('succeeds with valid data', async () => {
//   //   const newUser = {
//   //     username: 'testy',
//   //     name: 'Test Name',
//   //     password: 'test123',
//   //   };

//   //   await api
//   //     .post('/api/users')
//   //     .send(newUser)
//   //     .expect(200)
//   //     .expect('Content-Type', /application\/json/);

//   //   const usersAtEnd = await helper.usersInDb();
//   //   expect(usersAtEnd).toHaveLength(helper.initialBlogs.length + 1);

//   //   const usernames = usersAtEnd.map((user) => user.username);
//   //   expect(usernames).toContain('testy');
//   // });

//   // test('if username or password are missing, respond is 400 (Bad Request)', async () => {
//   //   const newUser = {
//   //     name: 'Test Name',
//   //   };

//   //   await api
//   //     .post('/api/users')
//   //     .send(newUser)
//   //     .expect(400);
//   // });
// });


// afterAll(() => {
//   mongoose.connection.close();
// });
