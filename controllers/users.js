const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('Bloglist');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(200);
  response.json(savedUser);
});


module.exports = usersRouter;
