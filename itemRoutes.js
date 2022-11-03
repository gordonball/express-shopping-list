"use strict";

const express = require("express");
const db = require("./fakeDb");
const router = new express.Router();


/**  */
router.get("/", function (req, res) {

  const result = res.json({ items: db.items });

  return result;
});

/**  */

router.post("/", function (req, res) {
    const { name, price } = req.body;
    const newItem = { name, price };
    db.items.push(newItem);
    return res.json({ added: newItem });
});

/**  */
router.get("/:name", function (req, res) {

    const itemList = db.items.filter(
        item => item[req.params.name]
    );

    if (itemList.length === 0) {
        throw new NotFoundError("Item not in database.")
    }
    return res.json(itemList[0]);
})

/**  */
router.patch("/:name", function (req, res) {

    for (let i = 0; i < db.items.length; i++) {
        if (db.items[i].name === req.params.name) {

            db.items[i].name = "name" in req.body ? req.body.name : db.items[i].name;
            db.items[i].price = "price" in req.body ? req.body.price : db.items[i].price;
            return res.json({ updated: db.items[i] });

        }
    }

});

router.delete("/:name", function (req, res) {
    for (let i = 0; i < db.items.length; i++) {
        if (db.items[i].name === req.params.name) {

            db.items.splice(i, 1);

            return res.json({ message: "Deleted" });

        }
    }
})

module.exports = router;