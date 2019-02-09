const express = require('express');

const router = express.Router();

const burger = require('../models/burger');

router.get('/', (req, res) => {
    burger.selectAll((data) => {
        const hbsObj = { burgers: data };
        console.log(hbsObj);
        res.render('index', hbsObj);
    });
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (data) => {
        res.json({ id: data.insertID })
    });
});

router.put('/api/burgers/:id', (req, res) => {
    let condition = `id = ${req.params.id}`;
    burger.updateOne({ devoured: true }, condition, (data) => {
        if (data.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end()
        }
    });
});

module.exports = router;
