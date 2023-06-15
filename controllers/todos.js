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
  let matcher = {};
  if (req.query.email) {
    User.findOne({
      email: req.query.email,
    })
      .then((user) => {
        console.log(user);
        matcher.uid = user.id;
        findTodo(matcher)
          .then((todos) => {
            console.log("called", matcher);
            res.json({ msg: "List Todos", val: todos });
          })
          .catch((e) => {
            res.json({ msg: "Error Occured", val: e });
          });
      })
      .catch((e) => {
        res.json({ msg: "Error Occured", val: "User not found!" });
      });
  } else {
    findTodo(matcher)
      .then((todos) => {
        console.log("called", matcher);
        res.json({ msg: "List Todos", val: todos });
      })
      .catch((e) => {
        res.json({ msg: "Error Occured", val: e });
      });
  }
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
    res.send({ hello: "", errors: result.array() });
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
            console.log("hello", value);
            const user = await User.find({
              email: value,
            });
            if (!user) {
              throw new Error(
                "A user does not exists with this e-mail address"
              );
            }
          }),
      ];
    }
  }
};

const findTodo = async (matcher = {}) => {
  console.log("hello", matcher);
  return await Todo.find(matcher);
};
module.exports = {
  createTodo,
  getTodo,
  listTodos,
  CREATE_TODO,
  UPDATE_TODO,
  validate,
};
