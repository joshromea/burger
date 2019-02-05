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
    burger.insertOne(['burger_name'], [req.body.burger_name], (result) => {
        res.redirect('/');
    });
});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    burger.updateOne({ devoured: true }, condition, (data) => {
        res.redirect('/');
    });
});

module.exports = router;
