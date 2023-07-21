const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async function (req, res, next) {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
});

router.get("/:id", async function (req, res, next) {
  const categories = await prisma.category.findUnique({
    where: {
      // id: +req.params.id
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json(categories);
});

router.patch("/:id", async function (req, res, next) {
  const categories = await prisma.category.updateMany({
    data: req.body,
    where: {
      // id: +req.params.id
      id: parseInt(req.params.id),
    },
  });
  res.status(200).json(categories);
});

router.delete("/:id", async function (req, res, next) {
  const categories = await prisma.category.delete({
    where: {
      // id: +req.params.id
      id: parseInt(req.params.id),
    },
  });
  res.status(202).json(categories);
});

router.post("/", async function (req, res, next) {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
