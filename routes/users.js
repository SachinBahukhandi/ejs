var express = require("express");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({})
    .then((users) => {
      res.json({ msg: "List Users", val: users });
    })
    .catch((e) => {
      res.json({ msg: "Error Occured", val: e });
    });
});

router.post("/", function (req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  user.save().then((val) => {
    res.json({ msg: "User Added Successfully", val: val });
  });
});

router.get("/:email", function (req, res, next) {
  User.find({
    email: req.params.email,
  }).then((user) => {
    if (!user.length) {
      res.json({ msg: "User not Found" });
    }
    res.json({ msg: "User Found Successfully", val: user });
  });
});

router.delete("/:email", function (req, res, next) {
  User.deleteOne({
    email: req.params.email,
  })
    .then((user) => {
      if (!user.deletedCount) {
        res.json({ msg: "User not Found" , user});
      }else{
        res.json({ msg: "User Deleted Successfully" });
      }

    })
    .catch(function (error) {
      console.log(error); // Failure
      res.json({ msg: "Error" , error: error});
    });
});

module.exports = router;
