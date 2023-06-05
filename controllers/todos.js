const Todo = require("../models/Todo");
const { query, validationResult, body, matchedData } = require("express-validator");

const CREATE_TODO = "create-todo";
const UPDATE_TODO = "update-todo";
const listTodos = (req, res) => {
  Todo.find({})
    .then((users) => {
      res.json({ msg: "List Todos", val: users });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
};

const createTodo = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log(data);
    // let user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    // });
    // user.save().then((val) => {
    //   res.json({ msg: "Todo Added Successfully", val: val });
    // });
    return res.send(`Test:, ${req.body.name}!`);
  }
  res.send({ errors: result.array() });
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
          // .custom(async (value) => {
          //   const existingUser = await User.find({
          //     email: value,
          //   });
          //   if (existingUser) {
          //     // Will use the below as the error message
          //     throw new Error("A user already exists with this e-mail address");
          //   }
          // }),
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
