const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

//const secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
  });

  res.json({ data: createdUser });
});

module.exports = router;
