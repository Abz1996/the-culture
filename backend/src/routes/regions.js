const express = require("express");
const regions = require("../data/regions");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ count: regions.length, results: regions });
});

router.get("/:id", (req, res, next) => {
  const region = regions.find((r) => r.id === req.params.id);
  if (!region) {
    const err = new Error(`Region '${req.params.id}' not found`);
    err.status = 404;
    return next(err);
  }
  res.json(region);
});

module.exports = router;
