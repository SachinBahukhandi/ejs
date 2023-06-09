const Todo = require("../models/Todo");
const User = require("../models/User");
const {
  query,
  validationResult,
  body,
  matchedData,
} = require("express-validator");

const CREATE_TODO = "create-todo";
const UPDATE_TODO = "update-todo";
const listTodos = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json({ msg: "List Todos", val: todos });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
};

const createTodo = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    User.findOne({
      email: data.email,
    }).then((user) => {
      let todo = new Todo({
        name: data.name,
        uid: user.id,
      });
      todo.save().then((val) => {
        res.json({ msg: "Todo Added Successfully", val: todo });
      });
    });
  } else {
    res.send({ errors: result.array() });
  }
};

const getTodo = (req, res) => {
  Todo.find({
    id: req.params.id,
  }).then((todo) => {
    if (!todo.length) {
      res.json({ msg: "Todo not Found" });
    } else {
      res.json({ msg: "Todo Found Successfully", val: todo });
    }
  });
};

const validate = (method) => {
  switch (method) {
    case CREATE_TODO: {
      return [
        body("name", "name doesn't exists").exists(),
        body("email", "User Email doesn't exists")
          .exists()
          .isEmail()
          .custom(async (value) => {
            const existingUser = await User.find({
              email: value,
            });
            console.log(existingUser.length);
            if (existingUser.length === 0) {
              // Will use the below as the error message
              throw new Error("A user does not exist with this e-mail address");
            }
          }),
      ];
    }
  }
};
module.exports = {
  createTodo,
  getTodo,
  listTodos,
  CREATE_TODO,
  UPDATE_TODO,
  validate,
};
