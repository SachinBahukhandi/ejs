const Todo = require("../models/Todo");
const { query, validationResult, body } = require("express-validator");

const CREATE_TODO = "create-todo";
const getTodos = (req, res) => {
  Todo.find({})
    .then((users) => {
      res.json({ msg: "List Users", val: users });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
};

const createUser = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    user.save().then((val) => {
      res.json({ msg: "User Added Successfully", val: val });
    });
    return res.send(`Hello, ${req.body.name}!`);
  }
  res.send({ errors: result.array() });
};

const getUser = (req, res) => {
  User.find({
    email: req.params.email,
  }).then((user) => {
    if (!user.length) {
      res.json({ msg: "User not Found" });
    } else {
      res.json({ msg: "User Found Successfully", val: user });
    }
  });
};

const validate = (method) => {
  switch (method) {
    case CREATE_USER: {
      return [
        body("name", "name doesn't exists").exists(),
        body("email", "Invalid email")
          .exists()
          .isEmail()
          .custom(async (value) => {
            const existingUser = await User.find({
              email: value,
            });
            if (existingUser) {
              // Will use the below as the error message
              throw new Error("A user already exists with this e-mail address");
            }
          }),
      ];
    }
    case UPDATE_USER: {
      return [
        body("name", "name doesn't exists").exists(),
        body("email", "Invalid email")
          .exists()
          .isEmail()
          .custom(async (value) => {
            const existingUser = await User.find({
              email: value,
            });
            if (existingUser) {
              // Will use the below as the error message
              throw new Error("A user already exists with this e-mail address");
            }
          }),
      ];
    }
  }
};
module.exports = {
  getTodo,
  CREATE_TODO
};
