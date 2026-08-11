const express = require("express");
const culture = require("../data/culture");

const router = express.Router();

router.get("/", (req, res) => {
  const { category } = req.query;
  let results = culture;
  if (category) {
    results = results.filter(
      (c) => c.category.toLowerCase() === String(category).toLowerCase()
    );
  }
  res.json({ count: results.length, results });
});

router.get("/:id", (req, res, next) => {
  const item = culture.find((c) => c.id === req.params.id);
  if (!item) {
    const err = new Error(`Culture entry '${req.params.id}' not found`);
    err.status = 404;
    return next(err);
  }
  res.json(item);
});

module.exports = router;
