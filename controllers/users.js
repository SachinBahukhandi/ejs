const User = require("../models/User");
const { query, validationResult, body, param } = require("express-validator");

const CREATE_USER = "create-user";
const UPDATE_USER = "update-user";
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.json({ msg: "List Users", val: users });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
};

const updateUser = (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    let dataToBeUpdated = {
      name: req.body.name,
    };
    let user = User.findOneAndUpdate(
      {
        email: req.params.email,
      },
      dataToBeUpdated
    );

    user
      .then((val) => {
        return res.json({ msg: "User Updated Successfully", val: val });
      })
      .catch((errors) => {
        return res.send({ errors: result.array() });
      });
  }
  return res.send({ errors: result.array() });

};

const createUser = (req, res) => {
  const result = validationResult(req, { strictParams: ["body"] });


  if (result.isEmpty()) {
    let user = new User({
      name: req.body.name,
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

const deleteUser = (req, res) => {
  User.deleteOne({
    email: req.params.email,
  })
    .then((user) => {
      if (!user.deletedCount) {
        res.json({ msg: "User not Found", user });
      } else {
        res.json({ msg: "User Deleted Successfully" });
      }
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.json({ msg: "Error", error: error });
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
        param("email", "Invalid email")
          .exists()
          .isEmail()
          .custom(async (value) => {
            const existingUser = await User.find({
              email: value,
            });
            if (existingUser.length==0) {
              // Will use the below as the error message
              throw new Error("User does not exists");
            }
          }),
      ];
    }
  }
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  validate,
  CREATE_USER,
  UPDATE_USER,
};
