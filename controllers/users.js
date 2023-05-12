const User = require("../models/User");
const { query, validationResult, body } = require('express-validator');

const CREATE_USER= 'create-user';
const getUsers = (req, res) => {
  User.find({})
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

const validate= (method)=>{
  switch (method) {
    case CREATE_USER: {
     return [
        body('name', "name doesn't exists").exists(),
        body('email', 'Invalid email').exists().isEmail()
       ]
    }
  }
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  validate,
  CREATE_USER

};
