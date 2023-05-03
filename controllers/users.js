const User = require("../models/User");
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
  new User({
    name: req.body.name,
    email: req.body.email,
  });
  user.save().then((val) => {
    res.json({ msg: "User Added Successfully", val: val });
  });
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
module.exports = {
  getUsers,
  createUser,
  getUser,
};
