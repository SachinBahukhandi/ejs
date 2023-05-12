var express = require("express");
const User = require("../models/User");
var router = express.Router();
const {getUsers, createUser, getUser, validate, CREATE_USER} = require('../controllers/users');
/* GET users listing. */
router.get("/", getUsers);

router.post("/",validate(CREATE_USER) ,createUser);

router.get("/:email", getUser);

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
