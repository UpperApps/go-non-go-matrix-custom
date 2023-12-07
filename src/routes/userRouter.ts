import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('My first user route');
});

export  default router;
