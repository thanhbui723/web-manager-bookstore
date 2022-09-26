//BookImportModel
const BookImportModel = require('../models/bookImport.M')

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    console.log('payment-get');
    BookImportModel.readAllBook(function(err, data) {
        res.render('bookImport', {
            nav: () => 'navbar',
            active: { bookImport: true },
            bookImport: data
        });
    });
});

router.post('/', (req, res) => {
    console.log('bookimport-post');
    console.log(req.body);
    BookImportModel.Add(req.body, function(err, data) {
        res.redirect('back');
    });
});


module.exports = router;