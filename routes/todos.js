var express = require("express");
var router = express.Router();


const {
getTodo,
listTodos,
CREATE_TODO,
validate,
createTodo,
} = require("../controllers/todos");
/* GET users listing. */

// // a middleware function with no mount path. This code is executed for every request to the router
router.get("/", listTodos);

router.post("/", validate(CREATE_TODO), createTodo);

// router.put("/:email", validate(UPDATE_USER), updateUser);

router.get("/:todo", getTodo);

router.delete("/:todo", deleteUser);

module.exports = router;
