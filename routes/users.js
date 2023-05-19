var express = require("express");
const User = require("../models/User");
var router = express.Router();
const {getUsers, createUser, getUser, deleteUser, validate, CREATE_USER, UPDATE_USER, updateUser} = require('../controllers/users');
/* GET users listing. */
router.get("/", getUsers);

router.post("/",validate(CREATE_USER) ,createUser);

router.put("/:email",validate(UPDATE_USER) ,updateUser);

router.get("/:email", getUser);

router.delete("/:email", deleteUser);

module.exports = router;
