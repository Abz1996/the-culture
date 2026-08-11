const express = require("express");
const foods = require("../data/foods");

const router = express.Router();

// GET /api/foods?region=Amhara&vegan=true
router.get("/", (req, res) => {
  const { region, vegan } = req.query;
  let results = foods;
  if (region) {
    results = results.filter(
      (f) => f.region.toLowerCase() === String(region).toLowerCase()
    );
  }
  if (vegan !== undefined) {
    const wantVegan = vegan === "true";
    results = results.filter((f) => f.vegan === wantVegan);
  }
  res.json({ count: results.length, results });
});

router.get("/:id", (req, res, next) => {
  const food = foods.find((f) => f.id === req.params.id);
  if (!food) {
    const err = new Error(`Food '${req.params.id}' not found`);
    err.status = 404;
    return next(err);
  }
  res.json(food);
});

module.exports = router;
