const debtM = require('../models/debt.M');
const turnoverM = require('../models/turnover.M');
const express = require('express'),
      router = express.Router();

router.get('/turnover', (req, res) => {
    res.render('report/turnover', {
        nav: () => 'navbar',
        active: { report: true }
    });
}); 
router.get('/debt', (req, res) => {
    res.render('report/debt', {
        nav: () => 'navbar',
        active: { report: true }
    });
}); 
router.post('/debt', async (req, res) => {
    const month = req.body.month;
    const year = req.body.year;
    console.log(req.body)
    const data = await debtM.all(month, year);
    console.log(data)
    return res.render('report/debt', {
        nav: () => 'navbar',
        debt: true,
        debts: data,
        active: { report: true }
    });
}); 
router.post('/turnover', async (req, res) => {
    const month = req.body.month;
    const year = req.body.year;
    console.log(req.body)
    const data = await turnoverM.all(month, year);
    console.log(data)
    return res.render('report/turnover', {
        nav: () => 'navbar',
        turnover: true,
        turnovers: data,
        active: { report: true }
    });
}); 
module.exports = router;