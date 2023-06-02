const Todo = require("../models/Todo");
const { query, validationResult, body } = require("express-validator");

const CREATE_TODO = "create-todo";
const UPDATE_TODO = "update-todo";
const getTodos = (req, res) => {
  Todo.find({})
    .then((users) => {
      res.json({ msg: "List Todos", val: users });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
};

const createTodos = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    user.save().then((val) => {
      res.json({ msg: "Todo Added Successfully", val: val });
    });
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
        body("user_id", "Invalid email")
          .exists()
          .custom(async (value) => {
            const existingUser = await User.find({
              id: value,
            });
            if (!existingUser) {
              // Will use the below as the error message
              throw new Error("No User associated with this id");
            }
          }),
      ];
    }
  }
};
module.exports = {
  getTodos,
  createTodos,
  getTodo,
  CREATE_TODO,
  UPDATE_TODO,
};
