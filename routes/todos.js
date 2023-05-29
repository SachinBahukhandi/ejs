var express = require("express");
var router = express.Router();
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  validate,
  CREATE_USER,
  UPDATE_USER,
  updateUser,
} = require("../controllers/users");

const {
getTodo,
CREATE_TODO
} = require("../controllers/todos");
/* GET users listing. */

// // a middleware function with no mount path. This code is executed for every request to the router
router.get("/", getTodo);

router.post("/", validate(CREATE_TODO), createUser);

// router.put("/:email", validate(UPDATE_USER), updateUser);

// router.get("/:email", getUser);

// router.delete("/:email", deleteUser);

module.exports = router;
