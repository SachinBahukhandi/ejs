var express = require("express");
const User = require("../models/User");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({}).then((users)=>{
      res.json({ msg: "List Users", val: users });
  }).catch(e=>{
    res.json({ msg: "Error Occured", val: e });
  })
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

router.get("/:id", function (req, res, next) {
  res.json(req.params);
});

module.exports = router;
