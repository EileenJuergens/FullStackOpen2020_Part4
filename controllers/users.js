const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('Bloglist');
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const users = await User.find({});
  const userNameAlreadyInUse = users.some((user) => user.username === body.username);

  if (!body.username || !body.password || body.username.length <= 3 || body.password.length <= 3
    || userNameAlreadyInUse) {
    response.status(400);
    response.json({ error: 'invalid login data' });
    response.end();
  } else {
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(200);
    response.json(savedUser);
  }
});


module.exports = usersRouter;
