var express = require("express");
const User = require("../models/User");
var router = express.Router();
const {getUsers, createUser, getUser, deleteUser, validate, CREATE_USER, UPDATE_USER} = require('../controllers/users');
/* GET users listing. */
router.get("/", getUsers);

router.post("/",validate(CREATE_USER) ,createUser);

router.put("/",validate(UPDATE_USER) ,createUser);

router.get("/:email", getUser);

router.delete("/:email", deleteUser);

module.exports = router;
