import express, { Request, Response } from "express";

import { z } from "zod";
const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next) => {
  res.json({ k: "hello" });
});

router.get("/names/:name", (req: Request, res: Response, next) => {
  res.json(req.params);
});

// module.exports = router;

export default router;
