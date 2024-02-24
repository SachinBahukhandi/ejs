import express,{Request, Response, Router}  from "express";

import UsersController from "../controllers/users";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();
const uc= new UsersController(prisma);

router.post("/", uc.addUser);

export default router;

// var express = require("express");
// const User = require("../models/User");
// var router = express.Router();
// const {
//   getUsers,
//   createUser,
//   getUser,
//   deleteUser,
//   validate,
//   CREATE_USER,
//   UPDATE_USER,
//   updateUser,
// } = require("../controllers/users");
// /* GET users listing. */

// const {readFn, writeFn} =  require('../models/conn');

// const {conn} = require('../models/mongo');



// router.get("/", getUsers);

// router.post("/", validate(CREATE_USER), createUser);

// router.get('/example-get', (req, res)=>{
//   pm1= new Promise.resolve('1');
//   pm2= new Promise.resolve('2');
//   // res.json(conn);
//   // readFn('SELECT * from users;').then((result)=>{
//   //     res.json(result);
//   // }).
//   // catch(e=>{
//   //   res.json({
//   //     error: JSON.stringify(e)
//   //   });
//   // })

// });

// router.put("/user/:email", validate(UPDATE_USER), updateUser);

// router.get("/user/:email", getUser);

// router.delete("/:email", deleteUser);



// module.exports = router;
