const express = require('express'),
      router = express.Router();
const booksM = require('../models/books.M');
const loginM = require('../models/login.M');

router.get('/', async(req, res) => {
    res.redirect('login')
});
router.post('/login', async(req, res) => {
    console.log(req.body);
    if(await loginM.get(req.body.username, req.body.password))
        return res.redirect('home');
    return res.render('login', {
        message: 'Sai tên đăng nhập hoặc mật khẩu!'
    });
});
router.get('/home', (req, res) => {
    res.render('home', {
        nav: () => 'navbar',
        active: { home: true }
    });
});
router.get('/bookLookUp', async (req, res) => {
    var books = await booksM.all();
    res.render('bookLookUp', {
        nav: () => 'navbar',
        books: books,
        active: { bookLookUp: true }
    });
});

router.use('/employee', require('./employee.C'));
router.use('/customer', require('./customer.C'));
router.use('/payment', require('./payment.C'));
router.use('/regulation', require('./regulation.C'));
router.use('/bookManagement', require('./bookManagement.C'));
router.use('/bookImport', require('./bookImport.C'));

/// end


router.get('/invoice', async (req, res) => {
    var data = await booksM.all();
    res.render('invoice', {
        nav: () => 'navbar',
        active: { invoice: true },
        books:  data
    });
});

router.get('/report', (req, res) => {
    res.render('report/turnover', {
        nav: () => 'navbar',
        active: { report: true }
    });
});
router.get('/login', (req, res) => {
    res.render('login', {
        //nav: () => 'navbar',
        active: { report: true }
    });
});
module.exports = router;